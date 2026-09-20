/* ============================================================
   UI · Renderizado de arena, pool y slots
============================================================ */
window.DraftSim = window.DraftSim || {};

(function(){
  var SPRITE_URL = window.DraftSim.SPRITE_URL;
  var els = {};

  function init(){
    els.arena = document.getElementById('arena');
    els.pool  = document.getElementById('grid');
  }

  function renderArena(){
    els.arena.innerHTML = ''
      + '<div class="team violeta" data-team="violeta">'
      +   '<div class="team-header">'
      +     '<div class="team-name"><span class="dot"></span> EQUIPO VIOLETA</div>'
      +   '</div>'
      +   '<div class="slots" data-slots="picks" data-team="violeta"></div>'
      +   '<div class="bans-label">BANS</div>'
      +   '<div class="bans" data-slots="bans" data-team="violeta"></div>'
      + '</div>'
      + '<div class="team naranja" data-team="naranja">'
      +   '<div class="team-header">'
      +     '<div class="team-name"><span class="dot"></span> EQUIPO NARANJA</div>'
      +   '</div>'
      +   '<div class="slots" data-slots="picks" data-team="naranja"></div>'
      +   '<div class="bans-label">BANS</div>'
      +   '<div class="bans" data-slots="bans" data-team="naranja"></div>'
      + '</div>';
  }

  function updatePicks(team, picks){
    var el = els.arena.querySelector('.slots[data-team="' + team + '"]');
    if (!el) return;
    el.innerHTML = picks.map(function(p){
      if (p){
        return '<div class="slot filled" data-slot="pick" data-team="' + team + '">'
             +   '<img src="' + SPRITE_URL(p.id) + '" alt="' + p.n + '">'
             + '</div>';
      }
      return '<div class="slot empty" data-slot="pick" data-team="' + team + '"></div>';
    }).join('');
  }

  function updateBans(team, bans){
    var el = els.arena.querySelector('.bans[data-team="' + team + '"]');
    if (!el) return;
    el.innerHTML = bans.map(function(p){
      if (p){
        return '<div class="ban filled" data-slot="ban" data-team="' + team + '">'
             +   '<img src="' + SPRITE_URL(p.id) + '" alt="' + p.n + '">'
             + '</div>';
      }
      return '<div class="ban empty" data-slot="ban" data-team="' + team + '"></div>';
    }).join('');
  }

  function renderPool(opts){
    var POKEMON   = window.DraftSim.POKEMON;
    var usedNames = opts.usedNames;
    var filter    = opts.filter;
    var armedName = opts.armedName;

    var list = POKEMON
      .filter(function(p){ return filter === 'all' || p.r === filter; })
      .sort(function(a, b){ return a.n.localeCompare(b.n); });

    els.pool.innerHTML = list.map(function(p){
      var taken = usedNames.has(p.n);
      var armed = armedName === p.n;
      var cls = ['poke'];
      if (taken) cls.push('taken');
      if (armed) cls.push('armed');
      return '<div class="' + cls.join(' ') + '" data-name="' + p.n + '">'
           +   '<span class="tip">' + p.n + '</span>'
           +   '<img src="' + SPRITE_URL(p.id) + '" alt="' + p.n + '" loading="lazy">'
           +   '<div class="role-bar role-' + p.r.replace('-','') + '"></div>'
           + '</div>';
    }).join('');
  }

  window.DraftSim.UI = {
    init: init,
    renderArena: renderArena,
    updatePicks: updatePicks,
    updateBans: updateBans,
    renderPool: renderPool,
    els: els
  };
})();