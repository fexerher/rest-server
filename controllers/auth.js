const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verifiy");
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

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;
    try {

        
        const {nombre, img, correo } = await googleVerify( id_token )

        let usuario = await Usuario.findOne({ correo })
        if(!usuario){
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }
           
            usuario = new Usuario( data )
            await usuario.save()
        }
        //Si el usuario en DB 
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Usuario bloqueado'
            })
        }
        //Generar el JWT 
        const token =   await  generarJWT( usuario.id )
        
        res.json({
            token,
            usuario
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

} 
module.exports = {
    login,
    googleSignIn
}