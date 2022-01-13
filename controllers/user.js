const { response, request  } = require('express')

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
const usuariosPost = (req, res)  => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post Api - controlador',
        nombre,
        edad
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