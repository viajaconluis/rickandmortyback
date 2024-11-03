const jwt = require('jsonwebtoken');

/*=============================================
VERIFICAR TOKEN
=============================================*/


let verificarToken=(req, res, next)=>{

let token= req.get('Authorization');

jwt.verify(token, process.env.SECRET, (err, decoded)=>{

if (err) {

	return res.json({
      status:401,
      mensaje:"El token de autorizacion no es valido"

	})
}

req.usuario = decoded.usuario;

next();


})


}


module.exports = {

verificarToken

}

