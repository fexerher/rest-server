

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

const obtenerTotalCarrito = async ( req, res ) => {

    const { productos } = req.body

    console.log(productos);
    // if(Object.keys(producto).length === 0){
    //     return res.json({
    //         msg: 'no hay productos'
    //     })
    // }

   
    // if( !producto ){
    //     return res.json({
    //         msg: 'Es necesario enviar un producto'
    //     })
    // }
   
    //const total = await Producto.find( {estado: true} )

  
    // const data =  producto.map( async ( prod ) => {

    //      await Producto.find( {nombre: prod.nombre.toUpperCase(), estado: true})
        
    // } )
    const mappedObjet = await Promise.all(
        productos.map( async (prod)  => {

           const data = await Producto.findOne( {nombre: prod.nombre.toUpperCase(), estado: true})

           if( !data){
               return res.json({
                   msg: 'No hay producto'
               })
           }
         
           return { precio: data.precio * prod.cantidad, nombre: data.nombre, envio: prod.envio}


       })
   )

  const total = mappedObjet.reduce( ( acumulador, producto ) => acumulador + producto.precio + producto.envio , 0 )


   res.json(
        {
           total,
           productos: mappedObjet
        }
   )
   
}


module.exports = {
    buscarCarritoProducto,
    obtenerTotalCarrito
}