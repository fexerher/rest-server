const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require('../models/usuario')


const login = async (req, res = response) => {

    const {correo, password} = req.body;


    try {
        
        //Verificarsi el email existe
        const usuario = await Usuario.findOne({ correo })

        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario - Password no son corrector - correo'
            })
        }
        //Si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario - Password no son corrector - estado: false'
            })
        }
        //Verificar la contraseñ
        const validPssword = bcryptjs.compareSync( password , usuario.password)
        if( !validPssword ){
            return res.status(400).json({
                msg: 'Usuario - Password no son corrector - password'
            })
        }
        //Generar el JWT
       const token =   await  generarJWT( usuario.id )
        

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Hable con el adminitrador"
        })
    }




}


module.exports = {
    login
}