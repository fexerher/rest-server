const { response, request  } = require('express')

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
const usuariosPut = (req, res)  => {

    const id = req.params.id

    res.json({
        msg: 'put Api - controlador',
        id
    })
}
const usuariosPost = async (req, res)  => {

    const body = req.body;

    const usuario = new Usuario( body )
    await usuario.save()

    res.json({
        msg: 'post Api - controlador',
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