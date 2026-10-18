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
     A T T A C K E R S
  ============================================================ */

  "Armarouge": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Chandelure": {
    strong: ["Clefable", "Suicune", "Blissey", "Eldegoss", "Wigglytuff", "Slowbro", "Lapras", "Goodra", "Charizard", "Buzzwole", "Tsareena", "Azumarill", "Tyranitar", "Scizor", "Zacian", "Falinks", "Metagross", "Tinkaton", "Dhelmise", "Moltres", "Quaquaval", "Palkia", "Solgaleo", "Mamoswine", "Trevenant", "Umbreon", "Vaporeon", "Articuno", "Mr. Mime", "Psyduck", "Alcremie", "Meganium"],
    weak: ["Machamp", "Garchomp", "Lucario", "Dragonite", "Aegislash", "Scyther", "Urshifu", "Blaziken", "Mimikyu", "Gyarados", "Mega Gyarados", "Ceruledge", "Pawmot", "Empoleon", "Mega Lucario", "Sirfetch'd", "Moltres"],
    teammates: ["Crustle", "Umbreon", "Snorlax"]
  },

  "Cinderace": {
    strong: ["Snorlax", "Blastoise", "Crustle", "Slowbro"],
    weak: ["Zeraora", "Absol", "Talonflame", "Gengar"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Mr. Mime"]
  },

  "Cramorant": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Greninja"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Decidueye": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Gengar"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Slowbro"]
  },

  "Delphox": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Greninja"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Dragapult": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Duraludon": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Greninja"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Slowbro"]
  },

  "Espeon": {
    strong: ["Tsareena", "Dragonite", "Azumarill", "Tyranitar", "Scizor", "Zacian", "Falinks", "Metagross", "Tinkaton", "Dhelmise", "Palkia"],
    weak: ["Zeraora", "Absol", "Talonflame", "Gengar"],
    teammates: ["Machamp", "Mamoswine", "Umbreon", "Wigglytuff", "Suicune", "Snorlax", "Dhelmise", "Slowbro", "Lapras", "Crustle", "Articuno", "Psyduck", "Mr. Mime"]
  },

  "Gardevoir": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Gengar", "Greninja"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Slowbro"]
  },

  "Glaceon": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Greninja"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Greninja": {
    strong: ["Snorlax", "Blastoise", "Crustle", "Decidueye"],
    weak: ["Slowbro", "Blastoise", "Snorlax", "Gengar", "Zeraora"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Slowbro"]
  },

  "Inteleon": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Greninja"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Latios": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Gengar"],
    teammates: ["Umbreon", "Latias", "Slowbro", "Snorlax", "Crustle", "Blastoise", "Mamoswine", "Trevenant", "Lapras", "Articuno", "Clefable", "Wigglytuff", "Mr. Mime", "Eldegoss", "Hoopa", "Psyduck", "Suicune", "Machamp"]
  },

  "Mega Mewtwo Y": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Mew": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Gengar"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Slowbro"]
  },

  "Miraidon": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Ninetales": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Greninja"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Pikachu": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Greninja"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Slowbro"]
  },

  "Raichu": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Greninja"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Reshiram": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Skeledirge": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Greninja"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Sylveon": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Typhlosion": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Venusaur": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame", "Greninja", "Gengar"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Slowbro"]
  },

  "Yveltal": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Zapdos": {
    strong: ["Snorlax", "Blastoise", "Crustle"],
    weak: ["Zeraora", "Absol", "Talonflame"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Toxtricity": {
    strong: ["Snorlax", "Blastoise", "Crustle", "Slowbro", "Lapras"],
    weak: ["Zeraora", "Absol", "Talonflame", "Greninja", "Cinderace"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Mr. Mime"]
  },


  /* ============================================================ 
     D E F E N D E R S
  ============================================================ */

  "Articuno": {
    strong: ["Greninja", "Cinderace", "Pikachu"],
    weak: ["Lucario", "Urshifu", "Zacian"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Blastoise": {
    strong: ["Greninja", "Cinderace", "Pikachu"],
    weak: ["Lucario", "Urshifu", "Zacian", "Absol"],
    teammates: ["Blissey", "Eldegoss", "Cinderace"]
  },

  "Crustle": {
    strong: ["Greninja", "Cinderace", "Pikachu"],
    weak: ["Lucario", "Urshifu", "Zacian"],
    teammates: ["Cinderace", "Greninja", "Pikachu"]
  },

  "Goodra": {
    strong: ["Greninja", "Cinderace", "Pikachu"],
    weak: ["Lucario", "Urshifu", "Zacian"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Greedent": {
    strong: ["Greninja", "Cinderace", "Pikachu"],
    weak: ["Lucario", "Urshifu", "Zacian"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Ho-Oh": {
    strong: ["Greninja", "Cinderace", "Pikachu"],
    weak: ["Lucario", "Urshifu", "Zacian"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Lapras": {
    strong: ["Greninja", "Cinderace", "Pikachu"],
    weak: ["Lucario", "Urshifu", "Zacian"],
    teammates: ["Blissey", "Eldegoss", "Cinderace"]
  },

  "Mamoswine": {
    strong: ["Greninja", "Cinderace", "Pikachu"],
    weak: ["Lucario", "Urshifu", "Zacian", "Absol"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Slowbro": {
    strong: ["Greninja", "Cinderace", "Pikachu", "Absol", "Gengar"],
    weak: ["Lucario", "Urshifu", "Zacian"],
    teammates: ["Cinderace", "Greninja", "Pikachu", "Decidueye"]
  },

  "Snorlax": {
    strong: ["Greninja", "Cinderace", "Pikachu"],
    weak: ["Lucario", "Urshifu", "Zacian"],
    teammates: ["Cinderace", "Greninja", "Pikachu"]
  },

  "Trevenant": {
    strong: ["Greninja", "Cinderace", "Pikachu"],
    weak: ["Lucario", "Urshifu", "Zacian"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Umbreon": {
    strong: ["Greninja", "Cinderace", "Pikachu", "Zoroark"],
    weak: ["Lucario", "Urshifu", "Zacian"],
    teammates: ["Cinderace", "Greninja", "Pikachu"]
  },

  "Vaporeon": {
    strong: ["Greninja", "Cinderace", "Pikachu"],
    weak: ["Lucario", "Urshifu", "Zacian"],
    teammates: ["Blissey", "Eldegoss"]
  },


  /* ============================================================ 
     A L L - R O U N D E R S
  ============================================================ */

  "Aegislash": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Azumarill": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Blaziken": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Buzzwole": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Ceruledge": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Charizard": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Dhelmise": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Dragonite": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Empoleon": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Falinks": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Feraligatr": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Flareon": {
    strong: ["Blissey", "Eldegoss", "Comfey", "Mr. Mime", "Wigglytuff"],
    weak: ["Greninja", "Cinderace", "Pikachu", "Inteleon", "Dragapult"],
    teammates: ["Snorlax", "Slowbro", "Umbreon", "Crustle"]
  },

  "Garchomp": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Gyarados": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Lucario": {
    strong: ["Blissey", "Eldegoss", "Comfey", "Snorlax", "Slowbro"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Eldegoss"]
  },

  "Machamp": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Mega Charizard X": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Mega Charizard Y": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Mega Gyarados": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Mega Lucario": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Mega Mewtwo X": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Metagross": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Mimikyu": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Moltres": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Palkia": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Pawmot": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Quaquaval": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Scizor": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Scyther": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Sirfetch'd": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Solgaleo": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Suicune": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Tinkaton": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Tsareena": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Tyranitar": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Urshifu": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Zacian": {
    strong: ["Blissey", "Eldegoss", "Comfey"],
    weak: ["Greninja", "Cinderace", "Pikachu"],
    teammates: ["Blissey", "Eldegoss"]
  },


  /* ============================================================ 
     S P E E D S T E R S
  ============================================================ */

  "Absol": {
    strong: ["Greninja", "Cinderace", "Decidueye"],
    weak: ["Snorlax", "Slowbro", "Umbreon", "Blastoise", "Mamoswine"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Darkrai": {
    strong: ["Greninja", "Cinderace", "Decidueye"],
    weak: ["Snorlax", "Slowbro", "Umbreon"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Dodrio": {
    strong: ["Greninja", "Cinderace", "Decidueye"],
    weak: ["Snorlax", "Slowbro", "Umbreon"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Gengar": {
    strong: ["Greninja", "Cinderace", "Decidueye", "Pikachu", "Gardevoir"],
    weak: ["Snorlax", "Slowbro", "Umbreon", "Blastoise"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Jolteon": {
    strong: ["Greninja", "Cinderace", "Decidueye", "Inteleon", "Dragapult"],
    weak: ["Snorlax", "Slowbro", "Umbreon", "Blastoise", "Mamoswine"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Comfey"]
  },

  "Leafeon": {
    strong: ["Greninja", "Cinderace", "Decidueye"],
    weak: ["Snorlax", "Slowbro", "Umbreon", "Mega Mewtwo X"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Meowscarada": {
    strong: ["Greninja", "Cinderace", "Decidueye"],
    weak: ["Snorlax", "Slowbro", "Umbreon"],
    teammates: ["Blissey", "Eldegoss"]
  },

  "Meowth": {
    strong: ["Greninja", "Cinderace", "Decidueye"],
    weak: ["Snorlax", "Slowbro", "Umbreon"],
    teammates: ["Slowbro", "Snorlax", "Suicune"]
  },

  "Morpeko": {
    strong: ["Greninja", "Cinderace", "Decidueye", "Inteleon", "Dragapult"],
    weak: ["Snorlax", "Slowbro", "Umbreon", "Blastoise", "Mamoswine"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Comfey"]
  },

  "Galarian Rapidash": {
    strong: ["Greninja", "Cinderace", "Decidueye", "Inteleon", "Dragapult"],
    weak: ["Snorlax", "Slowbro", "Umbreon", "Blastoise", "Mamoswine"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff", "Comfey"]
  },

  "Talonflame": {
    strong: ["Greninja", "Cinderace", "Decidueye"],
    weak: ["Snorlax", "Slowbro", "Umbreon"],
    teammates: ["Hoopa"]
  },

  "Zeraora": {
    strong: ["Greninja", "Cinderace", "Decidueye", "Pikachu"],
    weak: ["Snorlax", "Slowbro", "Umbreon", "Blastoise"],
    teammates: ["Blissey", "Eldegoss", "Wigglytuff"]
  },

  "Zoroark": {
    strong: ["Greninja", "Cinderace", "Decidueye"],
    weak: ["Umbreon", "Psyduck", "Snorlax"],
    teammates: ["Comfey", "Blissey", "Eldegoss"]
  },


  /* ============================================================ 
     S U P P O R T E R S
  ============================================================ */

  "Alcremie": {
    strong: ["Machamp", "Buzzwole", "Tyranitar"],
    weak: ["Greninja", "Cinderace", "Talonflame"],
    teammates: ["Snorlax", "Blastoise", "Crustle"]
  },

  "Blissey": {
    strong: ["Machamp", "Buzzwole", "Tyranitar"],
    weak: ["Greninja", "Cinderace", "Talonflame"],
    teammates: ["Snorlax", "Blastoise", "Crustle", "Cinderace"]
  },

  "Clefable": {
    strong: ["Zoroark", "Zeraora", "Buzzwole"],
    weak: ["Suicune", "Latios", "Delphox"],
    teammates: ["Snorlax", "Blastoise", "Crustle"]
  },

  "Comfey": {
    strong: ["Machamp", "Buzzwole", "Tyranitar"],
    weak: ["Greninja", "Cinderace", "Talonflame"],
    teammates: ["Snorlax", "Blastoise", "Crustle"]
  },

  "Eldegoss": {
    strong: ["Machamp", "Buzzwole", "Tyranitar"],
    weak: ["Greninja", "Cinderace", "Talonflame"],
    teammates: ["Snorlax", "Blastoise", "Crustle", "Cinderace"]
  },

  "Hoopa": {
    strong: ["Machamp", "Buzzwole", "Tyranitar"],
    weak: ["Greninja", "Cinderace", "Talonflame"],
    teammates: ["Snorlax", "Blastoise", "Crustle"]
  },

  "Latias": {
    strong: ["Machamp", "Buzzwole", "Tyranitar"],
    weak: ["Greninja", "Cinderace", "Talonflame"],
    teammates: ["Ceruledge", "Dragapult", "Slowbro", "Snorlax"]
  },

  "Meganium": {
    strong: ["Machamp", "Buzzwole", "Tyranitar"],
    weak: ["Greninja", "Cinderace", "Talonflame"],
    teammates: ["Snorlax", "Blastoise", "Crustle"]
  },

  "Mr. Mime": {
    strong: ["Machamp", "Buzzwole", "Tyranitar"],
    weak: ["Greninja", "Cinderace", "Talonflame"],
    teammates: ["Snorlax", "Blastoise", "Crustle"]
  },

  "Psyduck": {
    strong: ["Machamp", "Buzzwole", "Tyranitar"],
    weak: ["Greninja", "Cinderace", "Talonflame"],
    teammates: ["Snorlax", "Blastoise", "Crustle"]
  },

  "Sableye": {
    strong: ["Machamp", "Buzzwole", "Tyranitar"],
    weak: ["Greninja", "Cinderace", "Talonflame"],
    teammates: ["Snorlax", "Blastoise", "Crustle"]
  },

  "Wigglytuff": {
    strong: ["Ceruledge", "Machamp", "Buzzwole"],
    weak: ["Umbreon", "Greninja", "Cinderace"],
    teammates: ["Snorlax", "Blastoise", "Crustle", "Cinderace"]
  }

};
