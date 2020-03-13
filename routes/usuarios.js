//Rutas para crear usuarios
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuariosController");
const {check} = require('express-validator');

//Crea un usuario
router.post("/", usuarioController.crearUsuario);

module.exports = router;


//JWT = es un estandar cuyo fin es permitir compartir informacion entre distintas aplicaciones en un objeto JSON

//Cuando utilizar JWT? Cuando el usuario ha sido logueado se almacena el JWT 
//y se verifica para que pueda acceder a las dist rutas de la app, servicios o recursos que
// permite el token

//Intercambio de info: Son seguros para compartir datos entre aplicaciones, de esta froma te aseguras
// que los datos enviados a un servidor no seran interceptados