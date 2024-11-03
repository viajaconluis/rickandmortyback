
/*=============================================
IMPORTAR EXPRESS
=============================================*/

const express= require('express');
const app = express();

/*=============================================
IMPORTAR CONTROLADOR
=============================================*/

const Favorites=require('../controladores/favoritos.controlador');


/*=============================================
IMPORTAR MIDDLEWARE
=============================================*/


/*=============================================
CREAR RUTAS HTTP
=============================================*/

app.get('/mostrar-favoritos', Favorites.mostrarFavorites);

app.post('/crear-favoritos', Favorites.crearFavorites);

/*=============================================
EXPORTAR LA RUTA
=============================================*/

module.exports= app;