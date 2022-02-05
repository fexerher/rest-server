

const { response } = require("express")
const { Usuario, Producto } = require("../models")


const buscarCarritoProducto = async( req , res = response) => {

    //const regex = new RegExp( termino, 'i')
    //Producto.count
    
    const { nombre, cantidad } = req.body

    const productoDB = await Producto.findOne( { nombre: nombre.toUpperCase(), estado: true } )

    const producto = {
        subtotal: productoDB.precio * cantidad,
        nombre,
    } 
    //  body.forEach( async(producto) => {
    //     console.log(producto) 

    //     const productos = await Producto.find({nombre: producto.nombre.toUpperCase(), estado: true })

    //     productos.forEach( pds => console.log( pds.precio * 2) )
    // })

 
    
    
    
    //usuarios.forEach( usuarios => console.log(usuarios.precio))
    // const usuario = {
    //     nombre
    // }

    res.json({
        msg: 'ok',
        producto
    })
    
    // return res.json({
    //     results: usuarios
    // })

}


module.exports = {
    buscarCarritoProducto
}