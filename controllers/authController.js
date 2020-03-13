const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.autenticarUsuario = async (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer el email y password
  const { email, password } = req.body;

  try {
      //Revisar que sea un usuario registrado
      let usuario = await Usuario.findOne({email});
      if(!usuario) {
          return res.status(400).json({msg: 'El usuario no existe'})
      } 

      //Revisar el password
      const passCorrecto = await bcryptjs.compare(password, usuario.password);

      if(!passCorrecto) {
          return res.status(400).json({msg: 'Password Incorrecto'})
      }

      //Si todo es correxto

      //Crear el JWT
    const payload = {
        usuario: {
          id: usuario.id
        }
      };
  
      //y firmar el JWT
      jwt.sign(
        payload,
        process.env.SECRET,
        {
          expiresIn: 3600//1hr
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
          console.log("Json creado..");
        }
      );

  } catch (error) {
      console.log(error);
      
  }

};
