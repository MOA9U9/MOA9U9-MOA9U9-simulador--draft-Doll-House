/* ============================================================ 
   MATCHUPS MANUALES 
   ------------------------------------------------------------ 
   Edita a mano los matchups de los Pokémon que quieras. 
   Si un Pokémon NO está en esta lista, no se muestran esos datos. 
 
   CÓMO USARLO: 
   1. Copia el bloque de "PLANTILLA" de abajo. 
   2. Pégalo dentro de MATCHUPS = { ... }. 
   3. Cambia "NombreDelPokemon" por el nombre real. 
   4. Rellena los arrays con nombres de otros Pokémon. 
   5. Guarda y sube a GitHub. 
 
   CAMPOS DISPONIBLES: 
   - strong:     Pokémon a los que LE GANA 
   - weak:       Pokémon a los que PIERDE 
   - teammates:  Pokémon que le vienen BIEN como compañeros 
 
   REGLAS IMPORTANTES: 
   - Los nombres deben coincidir EXACTAMENTE con los de data.js 
   - Cada Pokémon termina en COMA (,) 
   - Los campos son OPCIONALES. 
============================================================ */ 
 
window.DraftSim = window.DraftSim || {}; 
 
window.DraftSim.MATCHUPS = { 
 
  /* ============================================================ 
     P L A N T I L L A
  ============================================================ */ 
  /* 
  "NombreDelPokemon": { 
    strong:    ["Pokemon1", "Pokemon2"], 
    weak:      ["Pokemon3", "Pokemon4"], 
    teammates: ["Pokemon7", "Pokemon8"] 
  }, 
  */ 


  /* ============================================================ 
     A R M A R O U G E
  ============================================================ */

  "Armarouge": {
    strong: ["Clefable"]
  },


  /* ============================================================ 
     C H A N D E L U R E
  ============================================================ */

  "Chandelure": {
    strong: [
      "Clefable",
      "Suicune",
      "Blissey",
      "Eldegoss",
      "Wigglytuff",
      "Slowbro",
      "Lapras",
      "Goodra",
      "Charizard",
      "Buzzwole",
      "Tsareena",
      "Azumarill",
      "Tyranitar",
      "Scizor",
      "Zacian",
      "Falinks",
      "Metagross",
      "Tinkaton",
      "Dhelmise",
      "Moltres",
      "Quaquaval",
      "Palkia",
      "Solgaleo",
      "Mamoswine",
      "Trevenant",
      "Umbreon",
      "Vaporeon",
      "Articuno",
      "Mr. Mime",
      "Psyduck",
      "Alcremie",
      "Meganium"
    ],

    weak: [
      "Machamp",
      "Garchomp",
      "Lucario",
      "Dragonite",
      "Aegislash",
      "Scyther",
      "Urshifu",
      "Blaziken",
      "Mimikyu",
      "Gyarados",
      "Mega Gyarados",
      "Ceruledge",
      "Pawmot",
      "Empoleon",
      "Mega Lucario",
      "Sirfetch'd",
      "Moltres"
    ],

    teammates: [
      "Crustle",
      "Umbreon",
      "Snorlax"
    ]
  },


  /* ============================================================ 
     E S P E O N
  ============================================================ */

  "Espeon": {
    strong: [
      "Tsareena",
      "Dragonite",
      "Azumarill",
      "Tyranitar",
      "Scizor",
      "Zacian",
      "Falinks",
      "Metagross",
      "Tinkaton",
      "Dhelmise",
      "Palkia"
    ],

    teammates: [
      "Machamp",
      "Mamoswine",
      "Umbreon",
      "Wigglytuff",
      "Suicune",
      "Snorlax",
      "Dhelmise",
      "Slowbro",
      "Lapras",
      "Crustle",
      "Articuno",
      "Psyduck",
      "Mr. Mime"
    ]
  },


  /* ============================================================ 
     L A T I O S
  ============================================================ */

  "Latios": {
    teammates: [
      "Umbreon",
      "Latias",
      "Slowbro",
      "Snorlax",
      "Crustle",
      "Blastoise",
      "Mamoswine",
      "Trevenant",
      "Lapras",
      "Articuno",
      "Clefable",
      "Wigglytuff",
      "Mr. Mime",
      "Eldegoss",
      "Hoopa",
      "Psyduck",
      "Suicune",
      "Machamp"
    ]
  },


  /* ============================================================ 
     L U C A R I O
  ============================================================ */

  "Lucario": {
    teammates: [
      "Eldegoss"
    ]
  },


  /* ============================================================ 
     T A L O N F L A M E
  ============================================================ */

  "Talonflame": {
    teammates: [
      "Hoopa"
    ]
  },


  /* ============================================================ 
     Z O R O A R K
  ============================================================ */

  "Zoroark": {
    weak: [
      "Umbreon",
      "Psyduck"
    ],

    teammates: [
      "Comfey"
    ]
  },


  /* ============================================================ 
     C L E F A B L E
  ============================================================ */

  "Clefable": {
    strong: [
      "Zoroark",
      "Zeraora",
      "Buzzwole"
    ],

    weak: [
      "Suicune",
      "Latios",
      "Delphox"
    ]
  },


  /* ============================================================ 
     W I G G L Y T U F F
  ============================================================ */

  "Wigglytuff": {
    strong: [
      "Ceruledge"
    ],

    weak: [
      "Umbreon"
    ]
  }


  /* ============================================================ 
     👇👇👇 AÑADE AQUÍ TUS POKÉMON 👇👇👇
  ============================================================ */

};