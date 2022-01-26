const { Categoria , Usuario, Producto} = require('../models')
const Role = require('../models/role')

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol})
    if( !existeRol ){
        throw new Error(`El rol ${rol} no está registrado en la BD` )
    }
}

const emailExiste = async ( correo = '') => {

    const existeEmail = await Usuario.findOne({ correo })
    if( existeEmail ){
       throw new Error(`El correo ${ correo } ya está registrado`)
    }

}
const existeUsuarioPorId = async ( id = '') => {

    const existeUsuario = await Usuario.findById( id )
    if( !existeUsuario ){
       throw new Error(`El id no existe ${id}`)
    }


}

const existeCategoriaPorId = async ( id = '') => {

    const existeCategoriaPorId = await Categoria.findById( id )
    if( !existeCategoriaPorId ){
       throw new Error(`El id no existe ${id}`)
    }

}

const existeCategoria = async ( id = '') => {

    const existeCategoria = await Categoria.findById( id )
    if( !existeCategoria ){
        throw new Error(`El id no existe ${id}`)
    }

}
const existeProducto = async ( id = '') => {
    const existeProducto = await Producto.findById( id )
    console.log(existeProducto);
    if( !existeProducto ){
        throw new Error(`El id no existe ${id}`)
    }

}
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeCategoria,
    existeProducto
}