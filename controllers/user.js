const { response, request  } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');

 const usuariosGet = (req = request, res = response)  => {
     const {q, nombre = 'no Name', apikey} = req.query;
    res.json({
        msg: 'get Api - controlador',
        q,
        nombre,
        apikey
    })
}
const usuariosPut = async (req, res)  =>  {

    const { id } = req.params
    const {_id, password, google, correo, ...resto } = req.body

    //TODO Validar contra base de datos
    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password , salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json({
        msg: 'put Api - controlador',
        usuario
    })
}
const usuariosPost = async (req, res)  => {

  

    const {nombre, correo, password , role} = req.body;
    const usuario = new Usuario( {nombre, correo, password, role} )

    //Verificar si el correo existe
   
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password , salt );
    //Guardar en DB
    await usuario.save()

    res.json({
        usuario
    })
}
const usuariosPatch = (req, res)  => {
    res.json({
        msg: 'patch Api - controlador'
    })
}
const usuariosDelete = (req, res)  => {
    res.json({
        msg: 'delete Api - controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}