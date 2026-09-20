/* ============================================================
   MAIN · Estado, interacción y arranque
============================================================ */
(function(){
  var POKEMON = window.DraftSim.POKEMON;
  var UI      = window.DraftSim.UI;

  var MAX_BANS  = 3;
  var MAX_PICKS = 5;

  var state = {
    armed:  null,
    picksV: [null, null, null, null, null],
    picksN: [null, null, null, null, null],
    bansV:  [null, null, null],
    bansN:  [null, null, null]
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

  function render(){
    UI.updatePicks('violeta', state.picksV);
    UI.updatePicks('naranja', state.picksN);
    UI.updateBans ('violeta', state.bansV);
    UI.updateBans ('naranja', state.bansN);
    UI.renderPool({
      usedNames: getUsedNames(),
      filter:    getFilter(),
      armedName: state.armed ? state.armed.n : null
    });
  }

  function handlePoolClick(name){
    var poke = POKEMON.find(function(p){ return p.n === name; });
    if (!poke) return;
    if (state.armed && state.armed.n === name){
      state.armed = null;
    } else {
      state.armed = poke;
    }
    render();
  }

  function handleSlotClick(slot){
    var team  = slot.dataset.team;
    var type  = slot.dataset.slot;
    var index = Array.prototype.indexOf.call(slot.parentElement.children, slot);
    var arr   = getArray(team, type);

    if (state.armed){
      arr[index]  = state.armed;
      state.armed = null;
    } else if (arr[index]){
      arr[index] = null;
    } else {
      return;
    }
    render();
  }

  function reset(){
    state.armed  = null;
    state.picksV = [null, null, null, null, null];
    state.picksN = [null, null, null, null, null];
    state.bansV  = [null, null, null];
    state.bansN  = [null, null, null];
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
      handleSlotClick(slot);
    });

    document.querySelectorAll('.filter').forEach(function(f){
      f.addEventListener('click', function(){
        document.querySelectorAll('.filter').forEach(function(x){
          x.classList.remove('on');
        });
        f.classList.add('on');
        render();
      });
    });

    document.getElementById('clearBtn').addEventListener('click', reset);
  }

  function init(){
    UI.init();
    UI.renderArena();
    bindEvents();
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();