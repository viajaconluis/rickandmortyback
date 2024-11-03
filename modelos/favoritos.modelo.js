/*=============================================
ESQUEMA PARA MODELO CONECTOR A MONGODB
=============================================*/
const mongoose = require('mongoose');

let Schema= mongoose.Schema;
let favoriteSchema= new Schema({

gender:{

  type:[String],
  required: [true, "La imagen es obligatoria"]
},
 location: {
        name: String,
        url: String
    },
name:{

  type:String,
  required: false
},
status:{

  type:String,
  required: false
},

origin: {
        name: String,
        url: String
    },
specie:{

  type:String,
  required: false
}

})

/*=============================================
EXPORTAR EL MODELO
=============================================*/

module.exports = mongoose.model("favorites", favoriteSchema);
