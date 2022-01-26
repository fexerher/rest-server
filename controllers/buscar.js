const { response } = require("express")
const { Usuario, Producto } = require("../models")

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarProductos = async( termino = '', res = response) => {

    //const regex = new RegExp( termino, 'i')
    //Producto.count
    const usuarios  = await Producto.find( { nombre: termino.toUpperCase(), estado: true } )

    
    return res.json({
        results: usuarios
    })

}

const buscar = ( req, res = response) => {

    const { coleccion , termino} = req.params;

    if(!coleccionesPermitidas.includes( coleccion )){
        return res.status(400).json({
            msg: `Las `
        })
    }
    switch ( coleccion ) {
        case 'usuarios': 
        
        break;
        case 'categoria': 

        break;
        case 'productos': 
            buscarProductos( termino, res )
        break;
        case 'roles': 

        break;
        default:
            return res.status(500).json({
                msg: `Se le olviod hacer esta busqueda`
            })
    }

  
}

module.exports = {
    buscar
}