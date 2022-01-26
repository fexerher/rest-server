const { Producto, Usuario, Categoria } = require("../models")







 const obtenerProductos = async( req, res ) => {

       const { limite = 5, desde = 0 } = req.query
       const query = { estado: true }

       if( isNaN( limite ) || isNaN(desde)){
        return res.status(400).json({msg: 'Error en la busqueda'})
       }

       const [ total, productos] = await Promise.all([
           Producto.countDocuments( query ),
           Producto.find(query)
                    .populate('usuario', 'nombre')
                    .populate('categoria', 'nombre')
                    .skip(Number(desde))
                    .limit(Number(limite))

       ])

       res.json({
           total,
           productos
       })
    

 }

 const obtenerProductosId = async ( req, res = response ) => {

    const { id } = req.params
    const query = { estado: true }
    
    
    const [ producto] = await Promise.all ([
        Producto.findById( id )
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .find(query)
    ])

    
    res.json( {
        producto
  } )

}


 const crearProducto = async ( req , res ) => {

        const { estado, usuario, ...body } = req.body
        
        console.log(body.nombre);

        const productoDB = await Producto.findOne( {nombre:body.nombre.toUpperCase()} )

        if( productoDB ){
            return res.status(400).json({
                msg: 'EL producto ya existe'
            })
        }
        
        const data = {
            ...body,
            nombre:body.nombre.toUpperCase(),
            usuario: req.usuario._id
        }

        const producto = new Producto( data )

        await producto.save()

        res.json( producto )


 }
 const actualizarProducto = async (req, res = response ) => {

    const { id } = req.params 
    const { estado, usuario , ...data} = req.body;


    data.nombre = data.nombre.toUpperCase()
    data.usuario = data._id

    
    
    const producto = await Producto.findByIdAndUpdate( id , data , { new: true })



    res.json( producto )



}

const borrarProducto = async (req, res = response ) => {

    const { id } = req.params 
    const producto = await Producto.findByIdAndUpdate( id , { estado: false })

    res.json( producto )

}


 module.exports = {
      obtenerProductos,
      obtenerProductosId,
      crearProducto,
      actualizarProducto,
      borrarProducto
 }