/* ============================================================
   UI · Renderizado con múltiples builds y buscador
   · Todas las listas con formato imagen + nombre
   · SIN sección "Bans peligrosos" (redundante)
============================================================ */
window.DraftSim = window.DraftSim || {};

(function(){
  var SPRITE_URL = window.DraftSim.SPRITE_URL;
  var els = {};

  function init(){
    els.arena      = document.getElementById('arena');
    els.pool       = document.getElementById('grid');
    els.assistant  = document.getElementById('assistantBody');
    els.summary    = document.getElementById('summary');
  }

  /* ---------- ARENA ---------- */
  function renderArena(){
    els.arena.innerHTML = ''
      + '<div class="team violeta" data-team="violeta">'
      +   '<div class="team-header"><div class="team-name"><span class="dot"></span> EQUIPO VIOLETA</div></div>'
      +   '<div class="slots" data-slots="picks" data-team="violeta"></div>'
      +   '<div class="bans-label">BANEOS</div>'
      +   '<div class="bans" data-slots="bans" data-team="violeta"></div>'
      + '</div>'
      + '<div class="team naranja" data-team="naranja">'
      +   '<div class="team-header"><div class="team-name"><span class="dot"></span> EQUIPO NARANJA</div></div>'
      +   '<div class="slots" data-slots="picks" data-team="naranja"></div>'
      +   '<div class="bans-label">BANEOS</div>'
      +   '<div class="bans" data-slots="bans" data-team="naranja"></div>'
      + '</div>';
  }

  function updatePicks(team, picks, inspectName){
    var el = els.arena.querySelector('.slots[data-team="' + team + '"]');
    if (!el) return;
    el.innerHTML = picks.map(function(p){
      if (p){
        var inspectCls = (inspectName === p.n) ? ' inspect' : '';
        return '<div class="slot filled' + inspectCls + '" data-slot="pick" data-team="' + team + '">'
             +   '<img src="' + SPRITE_URL(p.id) + '" alt="' + p.n + '">'
             +   '<button class="slot-clear" data-clear="1" title="Quitar">✕</button>'
             + '</div>';
      }
      return '<div class="slot empty" data-slot="pick" data-team="' + team + '"></div>';
    }).join('');
  }

  function updateBans(team, bans, inspectName){
    var el = els.arena.querySelector('.bans[data-team="' + team + '"]');
    if (!el) return;
    el.innerHTML = bans.map(function(p){
      if (p){
        var inspectCls = (inspectName === p.n) ? ' inspect' : '';
        return '<div class="ban filled' + inspectCls + '" data-slot="ban" data-team="' + team + '">'
             +   '<img src="' + SPRITE_URL(p.id) + '" alt="' + p.n + '">'
             +   '<button class="ban-clear" data-clear="1" title="Quitar">✕</button>'
             + '</div>';
      }
      return '<div class="ban empty" data-slot="ban" data-team="' + team + '"></div>';
    }).join('');
  }

  /* ---------- POOL ---------- */
  function renderPool(opts){
    var POKEMON = window.DraftSim.POKEMON;
    var search = (opts.search || '').toLowerCase().trim();

    var list = POKEMON
      .filter(function(p){
        if (opts.filter !== 'all' && p.r !== opts.filter) return false;
        if (search && p.n.toLowerCase().indexOf(search) === -1) return false;
        return true;
      })
      .sort(function(a, b){ return a.n.localeCompare(b.n); });

    if (!list.length){
      els.pool.innerHTML = '<div class="no-results">'
        + '😕 No se encontraron Pokémon con "<strong>' + search + '</strong>"'
        + '</div>';
      return;
    }

    els.pool.innerHTML = list.map(function(p){
      var cls = ['poke'];
      if (opts.usedNames.has(p.n)) cls.push('taken');
      if (opts.armedName === p.n)  cls.push('armed');
      return '<div class="' + cls.join(' ') + '" data-name="' + p.n + '">'
           +   '<span class="tip">' + p.n + '</span>'
           +   '<img src="' + SPRITE_URL(p.id) + '" alt="' + p.n + '" loading="lazy">'
           +   '<div class="role-bar role-' + p.r.replace(/[\s-]/g,'') + '"></div>'
           + '</div>';
    }).join('');
  }

  /* ============================================================
     ASISTENTE
  ============================================================ */
  function clearAssistant(){
    els.assistant.innerHTML = '<div class="assist-empty">Haz clic en un Pokémon del draft para ver su análisis detallado.</div>';
  }

  /* Bloque común: imagen + nombre (mismo formato) */
  function pokemonListBlock(title, list, type){
    if (!list || !list.length) return '';
    var rowCls = 'suggest-row';
    if (type === 'good') rowCls += ' row-good';
    if (type === 'bad')  rowCls += ' row-bad';

    return '<div class="assist-block">'
         +   '<div class="assist-h">' + title + '</div>'
         +   list.map(function(p){
               return '<div class="' + rowCls + '" data-name="' + p.n + '">'
                    +   '<img src="' + SPRITE_URL(p.id) + '" alt="' + p.n + '">'
                    +   '<span class="suggest-row-name">' + p.n + '</span>'
                    + '</div>';
             }).join('')
         + '</div>';
  }

  function renderAssistant(data){
    var A = window.DraftSim.Analyzer;

    if (data.focus){
      renderAssistantFocus(data, A);
      return;
    }
    renderAssistantGlobal(data, A);
  }

  /* ---------- Builds ---------- */
  function renderBuilds(builds){
    if (!builds || !builds.length){
      return '<div class="assist-h" style="margin-top:10px">Ítems recomendados</div>'
           + '<div class="assist-empty" style="font-size:.75rem">Sin builds disponibles.</div>';
    }

    if (builds.length === 1){
      var b = builds[0];
      return '<div class="assist-h" style="margin-top:10px">Ítems recomendados</div>'
           + '<div class="build-name">' + b.name + '</div>'
           + '<div class="build-moves">Movimientos: ' + (b.moves.join(' + ') || '—') + '</div>'
           + '<div class="chip-list">' + b.items.map(function(n, i){
                 var isBattle = (i === 3);
                 return '<span class="chip ' + (isBattle ? 'battle' : 'item') + '">' + (isBattle ? '⚔ ' : '') + n + '</span>';
               }).join('') + '</div>';
    }

    var html = '<div class="assist-h" style="margin-top:10px">Builds disponibles (' + builds.length + ')</div>';
    builds.forEach(function(b, idx){
      html += '<div class="build-card">'
           +    '<div class="build-header">'
           +      '<span class="build-num">Build ' + (idx + 1) + '</span>'
           +      '<span class="build-name-inline">' + b.name + '</span>'
           +    '</div>'
           +    '<div class="build-moves">Movimientos: ' + (b.moves.join(' + ') || '—') + '</div>'
           +    '<div class="chip-list">' + b.items.map(function(n, i){
                  var isBattle = (i === 3);
                  return '<span class="chip ' + (isBattle ? 'battle' : 'item') + '">' + (isBattle ? '⚔ ' : '') + n + '</span>';
                }).join('') + '</div>'
           +  '</div>';
    });
    return html;
  }

  function renderAssistantFocus(data, A){
    var p = data.focus.pokemon;
    var team = data.focus.team;
    var isEnemy = data.focus.isEnemy;
    var html = '';

    var wrClass = p.wr >= 51 ? 'good' : (p.wr >= 49.5 ? 'warn' : 'bad');
    var manual = (window.DraftSim.MATCHUPS || {})[p.n];

    /* Info principal */
    html += '<div class="assist-block">'
          +   '<div class="assist-h">' + (isEnemy ? '🔴 RIVAL · ' : '🟢 TU EQUIPO · ') + team.toUpperCase() + '</div>'
          +   '<div class="assist-poke">'
          +     '<img src="' + SPRITE_URL(p.id) + '" alt="' + p.n + '">'
          +     '<div class="assist-poke-info">'
          +       '<div class="assist-poke-name">' + p.n + '</div>'
          +       '<div class="assist-poke-role">' + p.r + ' · ID ' + p.id + '</div>'
          +     '</div>'
          +   '</div>'
          +   '<div class="stat-row"><span class="stat-label">Tasa de victoria</span><span class="stat-val ' + wrClass + '">' + p.wr + '%</span></div>'
          +   '<div class="stat-row"><span class="stat-label">Tasa de pick</span><span class="stat-val">' + (p.pr || 0) + '%</span></div>'
          +   '<div class="stat-row"><span class="stat-label">Tasa de baneo</span><span class="stat-val">' + p.br + '%</span></div>'
          + '</div>';

    /* Builds */
    html += '<div class="assist-block">' + renderBuilds(p.builds) + '</div>';

    /* Fuerte contra (imagen + nombre) */
    if (manual && manual.strong && manual.strong.length){
      var strongList = manual.strong.map(function(name){ return A.find(name); }).filter(Boolean);
      html += pokemonListBlock(p.n + ' es fuerte contra', strongList, 'good');
    }

    /* Débil contra (imagen + nombre) */
    if (manual && manual.weak && manual.weak.length){
      var weakList = manual.weak.map(function(name){ return A.find(name); }).filter(Boolean);
      html += pokemonListBlock(p.n + ' es débil contra', weakList, 'bad');
    }

    /* Sugerencias según equipo */
    if (isEnemy){
      var counters = A.picksAgainst(p, data.usedNames);
      if (counters.length) html += pokemonListBlock('Picks para contrarrestar a ' + p.n, counters, 'good');
    } else {
      var mates = A.teammatesFor(p, data.myPicks, data.usedNames);
      if (mates.length) html += pokemonListBlock('Compañeros que le vienen bien a ' + p.n, mates, 'good');
    }

    els.assistant.innerHTML = html;
  }

  function renderAssistantGlobal(data, A){
    var html = '';
    html += '<div class="assist-empty" style="padding:10px 0;font-size:.8rem">💡 Haz clic en un Pokémon del draft para ver su análisis.</div>';

    if (data.enemyPicks && data.enemyPicks.length){
      var picks = A.suggestPicks(data.enemyPicks, data.myPicks, data.usedNames);
      if (picks.length){
        var listPicks = picks.map(function(s){ return s.poke; }).filter(Boolean);
        html += pokemonListBlock('Picks globales sugeridos', listPicks, 'good');
      }
    }

    if (data.myPicks && data.myPicks.length){
      var syn = A.suggestSynergy(data.myPicks, data.usedNames);
      if (syn.length){
        html += pokemonListBlock('Sinergia global', syn, 'good');
      }
    }

    els.assistant.innerHTML = html;
  }

  /* ============================================================
     RESUMEN FINAL
  ============================================================ */
  function renderSummary(stats, picksV, picksN){
    var A = window.DraftSim.Analyzer;
    if (!stats) { els.summary.hidden = true; return; }

    function renderItemChip(name, isBattle){
      return '<span class="item-chip ' + (isBattle ? 'battle' : 'held') + '">'
           +   (isBattle ? '⚔ ' : '') + name + '</span>';
    }

    function renderTeam(name, analysis, picks){
      var valid = picks.filter(Boolean);
      return '<div class="summary-team ' + name + '">'
           +   '<h3>' + (name === 'violeta' ? '🟣 EQUIPO VIOLETA' : '🟠 EQUIPO NARANJA') + '</h3>'
           +   '<div class="stat-row"><span class="stat-label">Picks completados</span><span class="stat-val">' + analysis.count + '/5</span></div>'
           +   '<div class="assist-h" style="margin-top:8px">Composición</div>'
           +   '<ul>' + Object.keys(analysis.roles).map(function(r){
                 return '<li><span>' + r + '</span><span>' + analysis.roles[r] + '</span></li>';
               }).join('') + '</ul>'
           +   (analysis.warnings.length
                ? '<div class="assist-h" style="margin-top:8px">Avisos</div>'
                + '<div style="font-size:.75rem;color:#f9a825;line-height:1.5">'
                + analysis.warnings.map(function(w){ return '⚠ ' + w; }).join('<br>') + '</div>'
                : '')
           +   '<div class="assist-h" style="margin-top:10px">Build principal por pick</div>'
           +   '<div class="items-list">'
           +     valid.map(function(p){
                   var firstBuild = (p.builds && p.builds.length) ? p.builds[0] : null;
                   var items = firstBuild ? firstBuild.items : ['—','—','—','—'];
                   return '<div class="item-pick-row">'
                        +   '<img src="' + SPRITE_URL(p.id) + '" alt="' + p.n + '" class="item-pick-img">'
                        +   '<div class="item-pick-info">'
                        +     '<div class="item-pick-name">' + p.n + '</div>'
                        +     '<div class="item-chip-row">'
                        +       items.map(function(it, i){ return renderItemChip(it, i === 3); }).join('')
                        +     '</div>'
                        +   '</div>'
                        + '</div>';
                 }).join('')
           +   '</div></div>';
    }

    var adviceData = A.contextualAdvice(picksN);
    var adviceHtml = '';
    if (adviceData.advice.length){
      adviceHtml += '<div class="advice-box"><h3>🔧 Ajustes sugeridos por el draft rival</h3>'
                 +  '<div class="advice-comp">Rival detectado: '
                 +    adviceData.composition.special + ' especiales · '
                 +    adviceData.composition.melee + ' melee · '
                 +    adviceData.composition.cc + ' con CC · '
                 +    adviceData.composition.tanks + ' tanques · '
                 +    adviceData.composition.speedsters + ' speedsters</div>'
                 +  adviceData.advice.map(function(adv){
                      return '<div class="advice-row">'
                           +   '<span class="advice-icon">' + adv.icon + '</span>'
                           +   '<div class="advice-content">'
                           +     '<div class="advice-item">' + (adv.type === 'battle' ? '⚔ ' : '') + adv.item
                           +       ' <span class="advice-type">(' + (adv.type === 'battle' ? 'batalla' : 'held') + ')</span></div>'
                           +     '<div class="advice-reason">' + adv.reason + '</div>'
                           +     '<div class="advice-roles">Aplica a: ' + adv.roles.join(', ') + '</div>'
                           +   '</div></div>';
                    }).join('') + '</div>';
    }

    els.summary.innerHTML = '<h2>RESUMEN DEL DRAFT</h2>'
      + '<div class="summary-grid">'
      +   renderTeam('violeta', stats.violeta, picksV)
      +   renderTeam('naranja', stats.naranja, picksN)
      + '</div>' + adviceHtml;
    els.summary.hidden = false;
  }

  function hideSummary(){ els.summary.hidden = true; }

  window.DraftSim.UI = {
    init: init,
    renderArena: renderArena,
    updatePicks: updatePicks,
    updateBans: updateBans,
    renderPool: renderPool,
    renderAssistant: renderAssistant,
    clearAssistant: clearAssistant,
    renderSummary: renderSummary,
    hideSummary: hideSummary,
    els: els
  };
})();
