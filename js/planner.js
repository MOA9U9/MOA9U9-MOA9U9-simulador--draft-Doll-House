/* ============================================================
   PLANNER · Mapa interactivo con Pokémon y dibujo
   · Selector de mapa (Groudon / Kyogre / Rayquaza)
   · Lista lateral formato fila
   · Botón deshacer con stack de acciones
   · Drag & drop libre de Pokémon colocados
   · Correcciones: draggable según tool, dibujo sobre pokemon,
     dblclick solo en select, initStage con retry
============================================================ */
window.DraftSim = window.DraftSim || {};

(function(){
  var POKEMON    = window.DraftSim.POKEMON;
  var SPRITE_URL = window.DraftSim.SPRITE_URL;

  var stage, mapLayer, drawLayer, pokemonLayer;
  var currentTool = 'select';
  var armedPokemon = null;
  var initialized = false;
  var currentMapKey = 'groudon';
  var undoStack = [];

  var MAPS = {
    'groudon': {
      name: 'Theia Sky Ruins · Groudon',
      url:  'https://cdn.jsdelivr.net/npm/unite-lib@1.13.0/maps/map-groudon/map-groudon@2x.png'
    },
    'kyogre': {
      name: 'Theia Sky Ruins · Kyogre',
      url:  'https://cdn.jsdelivr.net/npm/unite-lib@1.13.0/maps/map-kyogre/map-kyogre@2x.png'
    },
    'rayquaza': {
      name: 'Theia Sky Ruins · Rayquaza',
      url:  'https://cdn.jsdelivr.net/npm/unite-lib@1.13.0/maps/map-rayquaza/map-rayquaza@2x.png'
    }
  };

  /* ------------------------------------------------------------
     UNDO SYSTEM
  ------------------------------------------------------------ */
  function pushUndo(fn){
    undoStack.push(fn);
    if (undoStack.length > 100) undoStack.shift();
    updateUndoButton();
  }

  function undo(){
    if (!undoStack.length) return;
    var fn = undoStack.pop();
    try { fn(); } catch(err){ console.warn('undo error', err); }
    updateUndoButton();
  }

  function updateUndoButton(){
    var btn = document.getElementById('plannerUndo');
    if (!btn) return;
    if (undoStack.length > 0) {
      btn.removeAttribute('disabled');
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
      btn.style.cursor = 'pointer';
    } else {
      btn.setAttribute('disabled', 'disabled');
      btn.disabled = true;
      btn.style.opacity = '.35';
      btn.style.pointerEvents = 'none';
      btn.style.cursor = 'not-allowed';
    }
  }

  /* ------------------------------------------------------------
     INICIALIZAR STAGE (con retry si dimensiones = 0)
  ------------------------------------------------------------ */
  function initStage(retries){
    retries = retries || 0;
    var container = document.getElementById('plannerCanvasContainer');
    if (!container || typeof Konva === 'undefined') return;

    var wrap = container.closest('.planner-canvas-wrap');
    if (!wrap) return;

    var width  = wrap.clientWidth;
    var height = wrap.clientHeight;

    /* Retry si el contenedor aún no tiene tamaño (ej. cambio rápido de pestaña) */
    if ((width === 0 || height === 0) && retries < 25) {
      setTimeout(function(){ initStage(retries + 1); }, 60);
      return;
    }
    /* Fallback por si acaso */
    if (width === 0 || height === 0) { width = 800; height = 500; }

    stage = new Konva.Stage({
      container: 'plannerCanvasContainer',
      width: width,
      height: height
    });

    mapLayer     = new Konva.Layer();
    drawLayer    = new Konva.Layer();
    pokemonLayer = new Konva.Layer();
    stage.add(mapLayer);
    stage.add(drawLayer);
    stage.add(pokemonLayer);

    mapLayer.add(new Konva.Rect({
      x: 0, y: 0,
      width: width, height: height,
      fill: '#14101f',
      listening: false,
      name: 'bgRect'
    }));

    loadMap(currentMapKey);

    /* Click sobre el FONDO del stage → colocar Pokémon armado */
    stage.on('click tap', function(e){
      if (e.target !== stage) return;
      if (currentTool !== 'select') return;
      if (!armedPokemon) return;

      var pos = stage.getPointerPosition();
      if (!pos) return;
      addPokemonToMap(armedPokemon, pos.x, pos.y);
      armedPokemon = null;
      updateCursor();
      highlightArmed();
    });

    /* Handler de borrado para la herramienta 🧹 */
    stage.on('click tap', function(e){
      if (currentTool !== 'erase') return;
      if (!e.target) return;
      if (e.target.getLayer && e.target.getLayer() === drawLayer) {
        var node = e.target;
        node.remove();
        drawLayer.draw();
        pushUndo(function(){
          drawLayer.add(node);
          drawLayer.draw();
        });
      }
    });

    initDrawing();
    initResize(wrap);
  }

  /* ------------------------------------------------------------
     CARGAR MAPA (contain, siempre completo)
  ------------------------------------------------------------ */
  function loadMap(key){
    var mapData = MAPS[key];
    if (!mapData || !stage) return;
    currentMapKey = key;

    mapLayer.find('Image').forEach(function(n){ n.destroy(); });
    mapLayer.find('Line').forEach(function(n){ n.destroy(); });

    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
      if (!stage) return;
      var w = stage.width();
      var h = stage.height();
      var ratio = Math.min(w / img.width, h / img.height);
      var newW = img.width * ratio;
      var newH = img.height * ratio;
      var offsetX = (w - newW) / 2;
      var offsetY = (h - newH) / 2;

      mapLayer.add(new Konva.Image({
        image: img,
        x: offsetX, y: offsetY,
        width: newW, height: newH,
        listening: false,
        opacity: 0.95,
        name: 'mapImage'
      }));
      mapLayer.draw();
    };
    img.onerror = function(){
      if (!stage) return;
      var w = stage.width();
      var h = stage.height();
      for (var x = 0; x < w; x += 40){
        mapLayer.add(new Konva.Line({
          points:[x,0,x,h], stroke:'#2a2040', strokeWidth:1, listening:false
        }));
      }
      for (var y = 0; y < h; y += 40){
        mapLayer.add(new Konva.Line({
          points:[0,y,w,y], stroke:'#2a2040', strokeWidth:1, listening:false
        }));
      }
      mapLayer.draw();
    };
    img.src = mapData.url;
  }

  function initResize(wrap){
    var resizeTimer;
    window.addEventListener('resize', function(){
      if (!stage) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){
        var w = wrap.clientWidth;
        var h = wrap.clientHeight;
        if (w > 0 && h > 0) {
          stage.width(w);
          stage.height(h);
          stage.draw();
          loadMap(currentMapKey);
        }
      }, 120);
    });
  }

  /* ------------------------------------------------------------
     AÑADIR POKÉMON (DRAGGABLE según tool actual)
  ------------------------------------------------------------ */
  function addPokemonToMap(pokemon, x, y){
    var group = new Konva.Group({
      x: x, y: y,
      draggable: (currentTool === 'select'),   // CORREGIDO: depende del tool
      name: 'pokemonGroup'
    });

    /* Halo (área de hit grande y cómoda para móvil) */
    group.add(new Konva.Circle({
      radius: 28,
      fill: 'rgba(11, 7, 19, 0.9)',
      stroke: '#ff7a1a',
      strokeWidth: 2,
      hitStrokeWidth: 14,
      listening: true,
      name: 'hitArea'
    }));

    /* Sprite */
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
      if (!stage) return;
      group.add(new Konva.Image({
        image: img,
        width: 46, height: 46,
        offsetX: 23, offsetY: 23,
        listening: false,
        perfectDrawEnabled: false
      }));
      pokemonLayer.batchDraw();
    };
    img.onerror = function(){
      if (!stage) return;
      group.add(new Konva.Text({
        text: pokemon.n.charAt(0),
        fontSize: 24,
        fontFamily: 'Rajdhani',
        fontStyle: 'bold',
        fill: '#ece6f5',
        align: 'center',
        width: 40, offsetX: 20, y: -16,
        listening: false
      }));
      pokemonLayer.batchDraw();
    };
    img.src = SPRITE_URL(pokemon.id);

    /* Nombre debajo */
    group.add(new Konva.Text({
      text: pokemon.n,
      fontSize: 10,
      fontFamily: 'Rajdhani',
      fontStyle: 'bold',
      fill: '#ece6f5',
      align: 'center',
      width: 100,
      offsetX: 50,
      y: 32,
      listening: false,
      shadowColor: '#000',
      shadowBlur: 4
    }));

    /* Al arrastrar, subir al frente */
    group.on('dragstart', function(){
      this.moveToTop();
      pokemonLayer.draw();
    });

    /* Doble toque para eliminar — SOLO en modo select */
    group.on('dblclick dbltap', function(){
      if (currentTool !== 'select') return;
      var g = this;
      g.remove();
      pokemonLayer.draw();
      pushUndo(function(){
        pokemonLayer.add(g);
        pokemonLayer.draw();
      });
    });

    pokemonLayer.add(group);
    pokemonLayer.draw();

    /* Undo: destruir el grupo */
    pushUndo(function(){
      group.destroy();
      pokemonLayer.draw();
    });
  }

  /* ------------------------------------------------------------
     DIBUJO (lápiz y flecha) — funciona sobre cualquier área
  ------------------------------------------------------------ */
  function initDrawing(){
    var isPointerDown = false;
    var startPoint = null;
    var currentShape = null;

    stage.on('mousedown touchstart', function(e){
      /* Solo activo con lápiz o flecha */
      if (currentTool !== 'pen' && currentTool !== 'arrow') return;
      /* Si el tool es select/erase no aplica */
      if (isPointerDown) return;

      isPointerDown = true;
      startPoint = stage.getPointerPosition();
      if (!startPoint) { isPointerDown = false; return; }

      var shape;
      if (currentTool === 'pen') {
        shape = new Konva.Line({
          stroke: '#ff7a1a',
          strokeWidth: 4,
          points: [startPoint.x, startPoint.y],
          lineCap: 'round',
          lineJoin: 'round',
          listening: true
        });
      } else {
        shape = new Konva.Arrow({
          points: [startPoint.x, startPoint.y, startPoint.x, startPoint.y],
          stroke: '#a56eff',
          strokeWidth: 4,
          fill: '#a56eff',
          pointerLength: 12,
          pointerWidth: 12,
          lineCap: 'round',
          listening: true
        });
      }
      drawLayer.add(shape);
      currentShape = shape;

      /* Undo de este trazo */
      pushUndo(function(){
        shape.destroy();
        drawLayer.draw();
      });

      drawLayer.draw();
    });

    stage.on('mousemove touchmove', function(){
      if (!isPointerDown || !currentShape) return;
      var pos = stage.getPointerPosition();
      if (!pos) return;

      if (currentTool === 'pen') {
        currentShape.points(currentShape.points().concat([pos.x, pos.y]));
      } else if (currentTool === 'arrow' && startPoint) {
        currentShape.points([startPoint.x, startPoint.y, pos.x, pos.y]);
      }
      drawLayer.draw();
    });

    stage.on('mouseup touchend', function(){
      isPointerDown = false;
      currentShape = null;
      startPoint = null;
    });
  }

  /* ------------------------------------------------------------
     TOOLBAR + SELECTOR DE MAPA + UNDO + CLEAR
  ------------------------------------------------------------ */
  function initToolbar(){
    var buttons = document.querySelectorAll('#plannerToolbar button');
    buttons.forEach(function(btn){
      if (btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', function(){
        buttons.forEach(function(b){ b.classList.remove('on'); });
        btn.classList.add('on');
        currentTool = btn.dataset.tool;
        armedPokemon = null;
        updateCursor();
        highlightArmed();
        /* Actualizar draggable según herramienta */
        if (pokemonLayer) {
          pokemonLayer.getChildren().forEach(function(g){
            g.draggable(currentTool === 'select');
          });
          pokemonLayer.draw();
        }
      });
    });

    /* Deshacer */
    var undoBtn = document.getElementById('plannerUndo');
    if (undoBtn && !undoBtn.dataset.bound) {
      undoBtn.dataset.bound = '1';
      undoBtn.addEventListener('click', undo);
    }

    /* Limpiar todo (con undo) */
    var clearBtn = document.getElementById('plannerClear');
    if (clearBtn && !clearBtn.dataset.bound) {
      clearBtn.dataset.bound = '1';
      clearBtn.addEventListener('click', function(){
        if (!drawLayer || !pokemonLayer) return;
        var drawChildren = drawLayer.getChildren().slice();
        var pokeChildren = pokemonLayer.getChildren().slice();
        if (!drawChildren.length && !pokeChildren.length) return;

        drawChildren.forEach(function(n){ n.remove(); });
        pokeChildren.forEach(function(n){ n.remove(); });
        drawLayer.draw();
        pokemonLayer.draw();

        pushUndo(function(){
          drawChildren.forEach(function(n){ drawLayer.add(n); });
          pokeChildren.forEach(function(n){ pokemonLayer.add(n); });
          drawLayer.draw();
          pokemonLayer.draw();
        });
      });
    }

    /* Selector de mapa */
    var mapSelect = document.getElementById('plannerMapSelect');
    if (mapSelect && !mapSelect.dataset.filled) {
      mapSelect.dataset.filled = '1';
      Object.keys(MAPS).forEach(function(key){
        var opt = document.createElement('option');
        opt.value = key;
        opt.textContent = MAPS[key].name;
        mapSelect.appendChild(opt);
      });
      mapSelect.value = currentMapKey;
      mapSelect.addEventListener('change', function(e){
        loadMap(e.target.value);
      });
    }
  }

  function updateCursor(){
    var wrap = document.querySelector('.planner-canvas-wrap');
    if (!wrap) return;
    if (armedPokemon) {
      wrap.style.cursor = 'crosshair';
    } else if (currentTool === 'pen' || currentTool === 'arrow') {
      wrap.style.cursor = 'crosshair';
    } else if (currentTool === 'erase') {
      wrap.style.cursor = 'not-allowed';
    } else {
      wrap.style.cursor = 'default';
    }
  }

  function highlightArmed(){
    document.querySelectorAll('.planner-pokemon-item').forEach(function(el){
      if (armedPokemon && el.dataset.name === armedPokemon.n) {
        el.style.borderColor = '#ff7a1a';
        el.style.boxShadow = '0 0 12px rgba(255,122,26,.5)';
        el.style.background = '#241a35';
      } else {
        el.style.borderColor = '';
        el.style.boxShadow = '';
        el.style.background = '';
      }
    });
  }

  /* ------------------------------------------------------------
     LISTA DE POKÉMON (formato fila: sprite + nombre + rol)
  ------------------------------------------------------------ */
  function renderPokemonList(filter){
    var listEl = document.getElementById('plannerPokemonList');
    if (!listEl) return;
    var search = (filter || '').toLowerCase().trim();

    var list = POKEMON.filter(function(p){
      if (search && p.n.toLowerCase().indexOf(search) === -1) return false;
      return true;
    }).sort(function(a, b){ return a.n.localeCompare(b.n); });

    listEl.innerHTML = list.map(function(p){
      return '<div class="planner-pokemon-item" draggable="true" data-name="' + p.n + '">'
           +   '<img src="' + SPRITE_URL(p.id) + '" alt="' + p.n + '" loading="lazy" '
           +     'onerror="this.style.opacity=0.2;">'
           +   '<span class="planner-item-name">' + p.n + '</span>'
           +   '<span class="planner-item-role">' + p.r + '</span>'
           + '</div>';
    }).join('');

    listEl.querySelectorAll('.planner-pokemon-item').forEach(function(item){
      item.addEventListener('dragstart', function(e){
        e.dataTransfer.setData('text/plain', item.dataset.name);
        e.dataTransfer.effectAllowed = 'copy';
      });

      item.addEventListener('click', function(){
        var poke = POKEMON.find(function(p){ return p.n === item.dataset.name; });
        if (!poke) return;
        if (armedPokemon && armedPokemon.n === poke.n) {
          armedPokemon = null;
        } else {
          armedPokemon = poke;
        }
        highlightArmed();
        updateCursor();
      });
    });
  }

  /* ------------------------------------------------------------
     DRAG & DROP AL CANVAS
  ------------------------------------------------------------ */
  function initDrop(){
    var wrap = document.querySelector('.planner-canvas-wrap');
    if (!wrap || wrap.dataset.dropBound) return;
    wrap.dataset.dropBound = '1';

    wrap.addEventListener('dragover', function(e){
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    });

    wrap.addEventListener('drop', function(e){
      e.preventDefault();
      if (!stage) return;
      var name = e.dataTransfer.getData('text/plain');
      if (!name) return;
      var poke = POKEMON.find(function(p){ return p.n === name; });
      if (!poke) return;

      var rect = stage.container().getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      addPokemonToMap(poke, x, y);
    });
  }

  /* ------------------------------------------------------------
     BUSCADOR
  ------------------------------------------------------------ */
  function initSearch(){
    var input = document.getElementById('plannerSearch');
    if (!input || input.dataset.bound) return;
    input.dataset.bound = '1';
    input.addEventListener('input', function(e){
      renderPokemonList(e.target.value);
    });
  }

  /* ------------------------------------------------------------
     API PÚBLICA
  ------------------------------------------------------------ */
  function init(){
    if (initialized) return;
    initialized = true;
    setTimeout(function(){
      initStage(0);
      initToolbar();
      renderPokemonList('');
      initSearch();
      initDrop();
      updateCursor();
      updateUndoButton();
    }, 80);
  }

  function resize(){
    if (!stage) return;
    var wrap = document.querySelector('.planner-canvas-wrap');
    if (!wrap) return;
    var w = wrap.clientWidth;
    var h = wrap.clientHeight;
    if (w > 0 && h > 0) {
      stage.width(w);
      stage.height(h);
      stage.draw();
      loadMap(currentMapKey);
    }
  }

  window.DraftSim.Planner = {
    init: init,
    resize: resize
  };
})();