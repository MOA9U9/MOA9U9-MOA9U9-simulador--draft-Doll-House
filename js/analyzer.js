/* ============================================================
   ANALYZER · Lógica del asistente de draft
   SOLO lee matchups desde js/matchups.js
   (weak se usa para weak, bans y counters)
============================================================ */
window.DraftSim = window.DraftSim || {};

(function(){
  var POKEMON = window.DraftSim.POKEMON;

  var SPECIAL_ATTACKERS = [
    "Pikachu","Raichu","Gardevoir","Chandelure","Espeon","Glaceon",
    "Sylveon","Delphox","Ninetales","Cramorant","Mew","Miraidon",
    "Armarouge","Suicune","Zapdos","Mega Mewtwo Y","Latios","Typhlosion",
    "Moltres","Reshiram","Skeledirge","Yveltal","Alcremie"
  ];

  var CC_HEAVY = [
    "Slowbro","Snorlax","Mr. Mime","Wigglytuff","Sableye","Psyduck",
    "Umbreon","Lapras","Trevenant","Goodra","Mamoswine","Blastoise",
    "Latias","Meganium","Clefable","Eldegoss"
  ];

  function find(name){ return POKEMON.find(function(p){ return p.n === name; }); }

  function getManual(pokemon){
    if (!pokemon) return null;
    return (window.DraftSim.MATCHUPS || {})[pokemon.n] || null;
  }

  function battleItemFor(role){
    switch(role){
      case "Attacker":     return "X Attack";
      case "Defender":     return "Eject Button";
      case "All-Rounder":  return "Full Heal";
      case "Speedster":    return "X Speed";
      case "Supporter":    return "Eject Button";
      default:             return "Eject Button";
    }
  }

  function itemsFor(pokemon){
    if (!pokemon) return [];
    if (pokemon.builds && pokemon.builds.length){
      return pokemon.builds[0].items;
    }
    return ['—','—','—','—'];
  }

  function avgWinrate(list){
    var valid = list.filter(Boolean);
    if (!valid.length) return 0;
    var sum = valid.reduce(function(a, p){ return a + p.wr; }, 0);
    return (sum / valid.length).toFixed(2);
  }

  function roleCount(list){
    var counts = { Attacker:0, Defender:0, "All-Rounder":0, Speedster:0, Supporter:0 };
    list.filter(Boolean).forEach(function(p){ counts[p.r]++; });
    return counts;
  }

  function analyzeTeam(picks){
    var valid = picks.filter(Boolean);
    var roles = roleCount(valid);
    var warnings = [];

    if (roles.Defender === 0)
      warnings.push("Sin Defender: equipo frágil en peleas largas.");
    if (roles.Attacker === 0)
      warnings.push("Sin Attacker: poco daño a distancia.");
    if (roles.Supporter === 0 && valid.length === 5)
      warnings.push("Sin Supporter: menos sustain en teamfights.");
    if (roles.Speedster === 0 && valid.length === 5)
      warnings.push("Sin Speedster: difícil cazar rivales débiles.");
    if (roles.Attacker + roles["All-Rounder"] + roles.Speedster >= 4)
      warnings.push("Exceso de daño: puede faltar tanque o sustain.");

    return {
      count: valid.length,
      winrate: avgWinrate(valid),
      roles: roles,
      warnings: warnings
    };
  }

  /* ============================================================
     FOCO · SOLO lee de matchups.js
  ============================================================ */
  function countersFor(pokemon){
    var m = getManual(pokemon);
    if (!m || !m.weak) return [];
    return m.weak.map(function(name){ return find(name); }).filter(Boolean);
  }

  function winsFor(pokemon){
    var m = getManual(pokemon);
    if (!m || !m.strong) return [];
    return m.strong.map(function(name){ return find(name); }).filter(Boolean);
  }

  /* Picks para contrarrestar → usa weak */
  function picksAgainst(pokemon, usedNames){
    var m = getManual(pokemon);
    if (!m || !m.weak) return [];
    return m.weak
      .map(function(name){ return find(name); })
      .filter(function(p){ return p && !usedNames.has(p.n); })
      .sort(function(a,b){ return b.wr - a.wr; });
  }

  /* Bans peligrosos → usa weak también */
  function bansAgainst(pokemon, usedNames){
    var m = getManual(pokemon);
    if (!m || !m.weak) return [];
    return m.weak
      .map(function(name){ return find(name); })
      .filter(function(p){ return p && !usedNames.has(p.n); })
      .sort(function(a,b){ return (b.wr + b.br*0.3) - (a.wr + a.br*0.3); });
  }

  function teammatesFor(pokemon, myTeamPicks, usedNames){
    var m = getManual(pokemon);
    if (!m || !m.teammates) return [];
    return m.teammates
      .map(function(name){ return find(name); })
      .filter(function(p){ return p && !usedNames.has(p.n); });
  }

  /* ============================================================
     GLOBAL · SOLO desde matchups.js
  ============================================================ */
  function suggestPicks(enemyPicks, myPicks, usedNames){
    var enemy = enemyPicks.filter(Boolean);
    if (!enemy.length) return [];

    var counters = {};
    enemy.forEach(function(e){
      var m = getManual(e);
      if (!m || !m.weak) return;
      m.weak.forEach(function(counterName){
        if (usedNames.has(counterName)) return;
        counters[counterName] = (counters[counterName] || 0) + 1;
      });
    });

    var suggestions = Object.keys(counters).map(function(name){
      var p = find(name);
      return { poke: p, score: counters[name] * 10 + p.wr };
    });

    suggestions.sort(function(a,b){ return b.score - a.score; });
    return suggestions.slice(0, 5);
  }

  function suggestBans(enemyPicks, myPicks, usedNames){
    var mine = myPicks.filter(Boolean);
    var candidates = {};

    mine.forEach(function(m){
      var manual = getManual(m);
      if (!manual || !manual.weak) return;
      manual.weak.forEach(function(counterName){
        if (usedNames.has(counterName)) return;
        var p = find(counterName);
        if (!p) return;
        var score = p.wr + (p.br * 0.3);
        candidates[counterName] = Math.max(candidates[counterName] || 0, score);
      });
    });

    var list = Object.keys(candidates).map(function(name){
      return { poke: find(name), score: candidates[name] };
    });
    list.sort(function(a,b){ return b.score - a.score; });
    return list.slice(0, 5);
  }

  function suggestSynergy(myPicks, usedNames){
    var mine = myPicks.filter(Boolean);
    if (!mine.length) return [];

    var mates = {};
    mine.forEach(function(m){
      var manual = getManual(m);
      if (!manual || !manual.teammates) return;
      manual.teammates.forEach(function(name){
        if (usedNames.has(name)) return;
        mates[name] = (mates[name] || 0) + 1;
      });
    });

    var list = Object.keys(mates).map(function(name){
      return find(name);
    }).filter(Boolean);

    list.sort(function(a,b){ return b.wr - a.wr; });
    return list.slice(0, 3);
  }

  /* ============================================================
     CONTEXTUAL
  ============================================================ */
  function analyzeEnemyComposition(enemyPicks){
    var valid = enemyPicks.filter(Boolean);
    var a = { special:0, physical:0, melee:0, ranged:0, cc:0, speedsters:0, tanks:0, total:valid.length };

    valid.forEach(function(e){
      if (SPECIAL_ATTACKERS.indexOf(e.n) !== -1) a.special++;
      else                                       a.physical++;

      if (CC_HEAVY.indexOf(e.n) !== -1)          a.cc++;

      if (e.r === "Attacker")                    a.ranged++;
      if (e.r === "Defender")                  { a.melee++; a.tanks++; }
      if (e.r === "All-Rounder")                 a.melee++;
      if (e.r === "Speedster")                 { a.melee++; a.speedsters++; }
      if (e.r === "Supporter")                   a.cc++;
    });

    return a;
  }

  function contextualAdvice(enemyPicks){
    var a = analyzeEnemyComposition(enemyPicks);
    var advice = [];

    if (a.special >= 2){
      advice.push({ type:"held", item:"Assault Vest", roles:["Defender","All-Rounder"],
        reason:"Rival con " + a.special + " atacantes especiales", icon:"🛡️" });
    }
    if (a.melee >= 3){
      advice.push({ type:"held", item:"Rocky Helmet", roles:["Defender","All-Rounder"],
        reason:"Rival con " + a.melee + " cuerpo a cuerpo", icon:"🪨" });
    }
    if (a.cc >= 2){
      advice.push({ type:"battle", item:"Full Heal", roles:["Attacker","Defender","All-Rounder","Speedster","Supporter"],
        reason:"Rival con " + a.cc + " Pokémon con control de masas", icon:"💊" });
    }
    if (a.speedsters >= 2){
      advice.push({ type:"battle", item:"X Speed", roles:["Attacker","Supporter"],
        reason:"Rival con " + a.speedsters + " Speedsters (necesitas escapar)", icon:"⚡" });
    }
    if (a.tanks >= 2){
      advice.push({ type:"held", item:"Drain Crown", roles:["All-Rounder","Attacker"],
        reason:"Rival con " + a.tanks + " tanques (necesitas sustain)", icon:"👑" });
    }
    if (a.tanks === 0 && a.total === 5){
      advice.push({ type:"battle", item:"X Attack", roles:["Attacker","Speedster","All-Rounder"],
        reason:"Rival sin tanques (prioriza burst)", icon:"⚔️" });
    }

    return { advice: advice, composition: a };
  }

  function finalStats(picksV, picksN){
    var aV = analyzeTeam(picksV);
    var aN = analyzeTeam(picksN);
    var diff = (aV.winrate - aN.winrate).toFixed(2);

    var verdict;
    if (Math.abs(diff) < 0.5) verdict = "DRAFT EQUILIBRADO";
    else if (diff > 0)        verdict = "VENTAJA VIOLETA (+" + diff + "% WR)";
    else                      verdict = "VENTAJA NARANJA (+" + Math.abs(diff) + "% WR)";

    return { violeta: aV, naranja: aN, verdict: verdict };
  }

  window.DraftSim.Analyzer = {
    find: find,
    analyzeTeam: analyzeTeam,
    suggestPicks: suggestPicks,
    suggestBans: suggestBans,
    suggestSynergy: suggestSynergy,
    finalStats: finalStats,
    itemsFor: itemsFor,
    battleItemFor: battleItemFor,
    countersFor: countersFor,
    winsFor: winsFor,
    picksAgainst: picksAgainst,
    bansAgainst: bansAgainst,
    teammatesFor: teammatesFor,
    analyzeEnemyComposition: analyzeEnemyComposition,
    contextualAdvice: contextualAdvice
  };
})();