/* ============================================================
   DATOS · Roster completo y helper de sprites
============================================================ */
window.DraftSim = window.DraftSim || {};

window.DraftSim.SPRITE_URL = function(id){
  return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + id + '.png';
};

window.DraftSim.POKEMON = [
  /* ---------- ATTACKERS ---------- */
  { n:"Pikachu",            r:"Attacker",     id:25   },
  { n:"Cinderace",          r:"Attacker",     id:815  },
  { n:"Greninja",           r:"Attacker",     id:658  },
  { n:"Venusaur",           r:"Attacker",     id:3    },
  { n:"Ninetales",          r:"Attacker",     id:38   },
  { n:"Cramorant",          r:"Attacker",     id:845  },
  { n:"Gardevoir",          r:"Attacker",     id:282  },
  { n:"Decidueye",          r:"Attacker",     id:724  },
  { n:"Sylveon",            r:"Attacker",     id:700  },
  { n:"Duraludon",          r:"Attacker",     id:884  },
  { n:"Chandelure",         r:"Attacker",     id:609  },
  { n:"Dragapult",          r:"Attacker",     id:887  },
  { n:"Mew",                r:"Attacker",     id:151  },
  { n:"Miraidon",           r:"Attacker",     id:1008 },
  { n:"Inteleon",           r:"Attacker",     id:818  },
  { n:"Espeon",             r:"Attacker",     id:196  },
  { n:"Glaceon",            r:"Attacker",     id:471  },
  { n:"Armarouge",          r:"Attacker",     id:936  },
  { n:"Suicune",            r:"Attacker",     id:245  },

  /* ---------- DEFENDERS ---------- */
  { n:"Snorlax",            r:"Defender",     id:143  },
  { n:"Slowbro",            r:"Defender",     id:80   },
  { n:"Crustle",            r:"Defender",     id:558  },
  { n:"Blastoise",          r:"Defender",     id:9    },
  { n:"Mamoswine",          r:"Defender",     id:473  },
  { n:"Greedent",           r:"Defender",     id:820  },
  { n:"Trevenant",          r:"Defender",     id:709  },
  { n:"Goodra",             r:"Defender",     id:706  },
  { n:"Lapras",             r:"Defender",     id:131  },
  { n:"Umbreon",            r:"Defender",     id:197  },
  { n:"Ho-Oh",              r:"Defender",     id:250  },

  /* ---------- ALL-ROUNDERS ---------- */
  { n:"Charizard",          r:"All-Rounder",  id:6    },
  { n:"Lucario",            r:"All-Rounder",  id:448  },
  { n:"Machamp",            r:"All-Rounder",  id:68   },
  { n:"Garchomp",           r:"All-Rounder",  id:445  },
  { n:"Aegislash",          r:"All-Rounder",  id:681  },
  { n:"Tsareena",           r:"All-Rounder",  id:763  },
  { n:"Dragonite",          r:"All-Rounder",  id:149  },
  { n:"Buzzwole",           r:"All-Rounder",  id:794  },
  { n:"Scizor",             r:"All-Rounder",  id:212  },
  { n:"Tyranitar",          r:"All-Rounder",  id:248  },
  { n:"Metagross",          r:"All-Rounder",  id:376  },
  { n:"Azumarill",          r:"All-Rounder",  id:184  },
  { n:"Zacian",             r:"All-Rounder",  id:888  },
  { n:"Urshifu",            r:"All-Rounder",  id:892  },
  { n:"Mimikyu",            r:"All-Rounder",  id:778  },
  { n:"Ceruledge",          r:"All-Rounder",  id:937  },
  { n:"Falinks",            r:"All-Rounder",  id:870  },
  { n:"Blaziken",           r:"All-Rounder",  id:257  },
  { n:"Tinkaton",           r:"All-Rounder",  id:959  },

  /* ---------- SPEEDSTERS ---------- */
  { n:"Talonflame",         r:"Speedster",    id:663  },
  { n:"Gengar",             r:"Speedster",    id:94   },
  { n:"Absol",              r:"Speedster",    id:359  },
  { n:"Zeraora",            r:"Speedster",    id:807  },
  { n:"Dodrio",             r:"Speedster",    id:85   },
  { n:"Leafeon",            r:"Speedster",    id:470  },
  { n:"Zoroark",            r:"Speedster",    id:571  },
  { n:"Meowscarada",        r:"Speedster",    id:908  },
  { n:"Darkrai",            r:"Speedster",    id:491  },
  { n:"Galarian Rapidash",  r:"Speedster",    id:78   },

  /* ---------- SUPPORTERS ---------- */
  { n:"Eldegoss",           r:"Supporter",    id:830  },
  { n:"Blissey",            r:"Supporter",    id:242  },
  { n:"Mr. Mime",           r:"Supporter",    id:122  },
  { n:"Wigglytuff",         r:"Supporter",    id:40   },
  { n:"Hoopa",              r:"Supporter",    id:720  },
  { n:"Clefable",           r:"Supporter",    id:36   },
  { n:"Comfey",             r:"Supporter",    id:764  },
  { n:"Sableye",            r:"Supporter",    id:302  },
  { n:"Psyduck",            r:"Supporter",    id:54   }
];