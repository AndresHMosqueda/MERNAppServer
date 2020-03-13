//Rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');

//Autenticar un usuario
//api/auth
router.post("/",
   [
    check('email', 'Agregar Email valido').isEmail(),
    check('password', 'El password debe ser minimo de 4 caracteres').isLength({min:4})
   ],
   authController.autenticarUsuario
)

module.exports = router;