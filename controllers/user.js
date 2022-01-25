const { response, request  } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');

 const usuariosGet =  async (req = request, res = response)  => {


     //const {q, nombre = 'no Name', apikey} = req.query;
     const { limite = 5, desde = 0} = req.query;
     const query = {estado:  true};

     if( isNaN( limite ) || isNaN(desde)){
         return res.status(400).json({msg: 'Error en la busqueda'})
     }
    const [total, usuarios] = await  Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
          .skip(Number( desde ))
          .limit( Number( limite ) )
    ])

    res.json({
        total,
        usuarios
    })
}
const obtenerUsuarioId = async ( req, res ) => {


    const { id }  = req.params

    const usuario = await Usuario.findById( id )

    res.json( usuario )

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

    res.json(usuario)
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
const usuariosDelete = async (req, res)  => {

    const {id}  = req.params
    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete( id )
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } )
    res.json(usuario)
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete,
    obtenerUsuarioId
}