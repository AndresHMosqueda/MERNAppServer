const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

//Controler conecta la peticion con el modelo y el modelo con la vista
exports.crearUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // crear el nuevo usuario
    usuario = new Usuario(req.body);

    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await usuario.save();

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
    res.status(400).send("Hubo un error ");
  }
};

//El modelo va a darle la estructura que va a tener la base de datos y los registros
