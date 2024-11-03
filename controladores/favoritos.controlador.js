/*=============================================
IMPORTAR MODELO
=============================================*/

const Favorites  = require('../modelos/favoritos.modelo');

/*=============================================
ADMINISTRACION DE CARPETAS Y ARCHIVOS EN NODE JS
=============================================*/
const fs = require('fs');
const path=require('path');

/*=============================================
FUNCION GET
=============================================*/

let mostrarFavorites = (req, res) => {
	// res.send('Hello World')

	Favorites.find({}).then((data) => {

		//Contar la cantodad de registros

		Favorites.countDocuments({}).then((total) => {
			res.json({

				status: 200,
				total,
				data

			})
		}).catch((err) => {
			if (err) {

				return res.json({

					status: 500,
					mensaje: "Error en la peticion"

				})
			}
		});


	}).catch((err) => {
		if (err) {

			return res.json({

				status: 500,
				mensaje: "Error en la peticion"

			})
		}
	});



}

/*=============================================
FUNCION POST
=============================================*/

// let crearFavorites = (req, res) => {
//     //let userId = req.params.userid;
    
//     let body = req.body;
  
//     let newFavorites = new Favorites({
//      gender: body.gender,
//      location: body.location,
//      name: body.name,
//      status: body.status,
//      origin: body.origin,
//      specie: body.specie,
     
//     });
  
//     newFavorites.save({})
      
       
//         .then((data) => {
//           res.json({
//             status: 200,
//             data: data,
//             mensaje: "Favoritos agregados correctanmente"
//           });
//         })
//         .catch(err => {
//           res.json({
//             status: 400,
//             mensaje: "Error al almacenar los favoritos",
//             err: err.message
//           });
//         });
     
     
//   }



let crearFavorites = (req, res) => {
    const favorites = req.body;
    //console.log("favorites", favorites);
  
 
    const savePromises = favorites.map((fav) => {
        const newFavorite = new Favorites({
        	
            gender: fav.gender,
            location: fav.location,
            name: fav.name,
            status: fav.status,
            origin: fav.origin,
            specie: fav.species,
        });
        return newFavorite.save();
    });
    // Ejecuta todas las promesas y envía la respuesta cuando todas hayan terminado
    Promise.all(savePromises)
        .then((data) => {
            res.json({
                status: 200,
                data: data,
                mensaje: "Favoritos agregados correctamente"
            });
        })
        .catch(err => {
            res.json({
                status: 400,
                mensaje: "Error al almacenar los favoritos",
                err: err.message
            });
        });
}


let crearSlideMultiple = (req, res) => {
 // obtener el cuerpo del formulario
  let body = req.body;
  // console.log("body", body);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.json({
      status: 500,
      mensaje: "Las imágenes no pueden ir vacías",
    });
  }

  // Validar las imágenes
  const archivos = Array.isArray(req.files.archivos)
    ? req.files.archivos
    : [req.files.archivos];

  let error = false;
  let mensajesError = [];

  archivos.forEach((archivo) => {
    // Validar la extensión del archivo
    if (archivo.mimetype !== "image/jpeg" && archivo.mimetype !== "image/png") {
      error = true;
      mensajesError.push(
        `La imagen ${archivo.name} debe ser formato JPG o PNG`
      );
    }

    // Validar el tamaño del archivo
    if (archivo.size > 2000000) {
      error = true;
      mensajesError.push(
        `La imagen ${archivo.name} debe tener un tamaño menor a 2MB`
      );
    }
  });

  if (error) {
    return res.json({
      status: 400,
      mensajesError,
    });
  }

  // Mover los archivos a la carpeta y guardar sus nombres en un arreglo
  let nombresArchivos = [];

  const guardarArchivo = (archivo) => {
    const nombre = Math.floor(Math.random() * 10000);
    const extension = archivo.name.split(".").pop();
    const nombreArchivo = `${nombre}.${extension}`;
    archivo.mv(`./archivos/slide/${nombreArchivo}`, (err) => {
      if (err) {
        error = true;
        mensajesError.push(
          `Error al guardar la imagen ${archivo.name}: ${err.message}`
        );
        if (nombresArchivos.length === archivos.length) {
          return guardarSlideModelo();
        }
      } else {
        nombresArchivos.push(nombreArchivo);
        if (nombresArchivos.length === archivos.length) {
          return guardarSlideModelo();
        }
      }
    });
  };

  const guardarSlideModelo = () => {
    let slideModelo = new Slide({
      imagen: nombresArchivos,
    });

    slideModelo.save()
      .then((data) => {
        res.json({
          status: 200,
          data,
          mensaje: "Los slides han sido creados correctamente",
        });
      })
      .catch((err) => {
        return res.json({
          status: 400,
          mensaje: "Error al almacenar los slides",
          err,
        });
      });
  };

  archivos.forEach(guardarArchivo);
};









/*=============================================
EXPORTAR FUNCIONES DEL CONTROLADOR
=============================================*/

module.exports = {


	mostrarFavorites,
	crearFavorites,

}

// app.get('/',function