/* ============================================================
   MAIN · Estado, interacción y arranque
   · Con buscador de Pokémon
============================================================ */
(function(){
  var POKEMON = window.DraftSim.POKEMON;
  var UI      = window.DraftSim.UI;
  var A       = window.DraftSim.Analyzer;

  var state = {
    armed:  null,
    picksV: [null, null, null, null, null],
    picksN: [null, null, null, null, null],
    bansV:  [null, null, null],
    bansN:  [null, null, null],
    focus:  null,
    search: ''
  };

  function getFilter(){
    var active = document.querySelector('.filter.on');
    return active ? active.dataset.role : 'all';
  }

  function getUsedNames(){
    var set = new Set();
    [state.picksV, state.picksN, state.bansV, state.bansN].forEach(function(arr){
      arr.forEach(function(p){ if (p) set.add(p.n); });
    });
    return set;
  }

  function getArray(team, type){
    if (type === 'pick') return (team === 'violeta') ? state.picksV : state.picksN;
    return (team === 'violeta') ? state.bansV : state.bansN;
  }

  function setFocus(pokemon, team, isEnemy){
    state.focus = { pokemon: pokemon, team: team, isEnemy: isEnemy };
  }

  function render(){
    var inspectName = state.focus ? state.focus.pokemon.n : null;
    UI.updatePicks('violeta', state.picksV, inspectName);
    UI.updatePicks('naranja', state.picksN, inspectName);
    UI.updateBans ('violeta', state.bansV, inspectName);
    UI.updateBans ('naranja', state.bansN, inspectName);
    UI.renderPool({
      usedNames: getUsedNames(),
      filter:    getFilter(),
      armedName: state.armed ? state.armed.n : null,
      search:    state.search
    });
    updateAssistant();
    updateSummary();
  }

  function updateAssistant(){
    var myPicks    = state.picksV.filter(Boolean);
    var enemyPicks = state.picksN.filter(Boolean);

    UI.renderAssistant({
      focus:      state.focus,
      enemyPicks: enemyPicks,
      myPicks:    myPicks,
      usedNames:  getUsedNames()
    });
  }

  function updateSummary(){
    var vFull = state.picksV.every(Boolean);
    var nFull = state.picksN.every(Boolean);
    if (vFull && nFull){
      var stats = A.finalStats(state.picksV, state.picksN);
      UI.renderSummary(stats, state.picksV, state.picksN);
    } else {
      UI.hideSummary();
    }
  }

  function handlePoolClick(name){
    var poke = POKEMON.find(function(p){ return p.n === name; });
    if (!poke) return;
    state.armed = (state.armed && state.armed.n === name) ? null : poke;
    render();
  }

  function handlePickClick(slot, e){
    var team  = slot.dataset.team;
    var index = Array.prototype.indexOf.call(slot.parentElement.children, slot);
    var arr   = getArray(team, 'pick');

    if (e.target.closest('.slot-clear')){
      var removed = arr[index];
      arr[index] = null;
      if (state.focus && removed && state.focus.pokemon.n === removed.n){
        state.focus = null;
      }
      render();
      return;
    }

    if (state.armed){
      arr[index] = state.armed;
      setFocus(state.armed, team, team === 'naranja');
      state.armed = null;
      render();
      return;
    }

    if (arr[index]){
      setFocus(arr[index], team, team === 'naranja');
      render();
      return;
    }
  }

  function handleBanClick(slot, e){
    var team  = slot.dataset.team;
    var index = Array.prototype.indexOf.call(slot.parentElement.children, slot);
    var arr   = getArray(team, 'ban');

    if (e.target.closest('.ban-clear')){
      var removed = arr[index];
      arr[index] = null;
      if (state.focus && removed && state.focus.pokemon.n === removed.n){
        state.focus = null;
      }
      render();
      return;
    }

    if (state.armed){
      arr[index] = state.armed;
      setFocus(state.armed, team, team === 'naranja');
      state.armed = null;
      render();
      return;
    }

    if (arr[index]){
      setFocus(arr[index], team, team === 'naranja');
      render();
      return;
    }
  }

  function reset(){
    state.armed    = null;
    state.focus    = null;
    state.picksV   = [null, null, null, null, null];
    state.picksN   = [null, null, null, null, null];
    state.bansV    = [null, null, null];
    state.bansN    = [null, null, null];
    state.search   = '';
    var si = document.getElementById('searchInput');
    if (si) si.value = '';
    UI.hideSummary();
    UI.clearAssistant();
    render();
  }

  function bindEvents(){
    document.getElementById('grid').addEventListener('click', function(e){
      var poke = e.target.closest('.poke');
      if (!poke) return;
      handlePoolClick(poke.dataset.name);
    });

    document.getElementById('arena').addEventListener('click', function(e){
      var slot = e.target.closest('.slot, .ban');
      if (!slot) return;
      if (slot.dataset.slot === 'pick') handlePickClick(slot, e);
      else                              handleBanClick(slot, e);
    });

    document.getElementById('assistantBody').addEventListener('click', function(e){
      var row = e.target.closest('.suggest-row');
      if (!row) return;
      handlePoolClick(row.dataset.name);
    });

    document.querySelectorAll('.filter').forEach(function(f){
      f.addEventListener('click', function(){
        document.querySelectorAll('.filter').forEach(function(x){ x.classList.remove('on'); });
        f.classList.add('on');
        render();
      });
    });

    document.getElementById('clearBtn').addEventListener('click', reset);

    // Buscador
    var searchInput = document.getElementById('searchInput');
    if (searchInput){
      searchInput.addEventListener('input', function(e){
        state.search = e.target.value;
        UI.renderPool({
          usedNames: getUsedNames(),
          filter:    getFilter(),
          armedName: state.armed ? state.armed.n : null,
          search:    state.search
        });
      });
    }
  }

  function init(){
    UI.init();
    UI.renderArena();
    UI.clearAssistant();
    bindEvents();
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
