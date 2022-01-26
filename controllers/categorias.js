

const { response } = require('express')
const { Categoria, Usuario } = require('../models');


// obtenerCategorias - paginado - total  - populate
const obtenerCategorias =  async (req = request, res = response)  => {


    //const {q, nombre = 'no Name', apikey} = req.query;
    const { limite = 5, desde = 0} = req.query;
    const query = {estado:  true};

    if( isNaN( limite ) || isNaN(desde)){
        return res.status(400).json({msg: 'Error en la busqueda'})
    }
   const [total, categorias] = await  Promise.all([
       Categoria.countDocuments(query),
       Categoria.find(query)
         .populate('usuario', 'nombre')
         .skip(Number( desde ))
         .limit( Number( limite ) )
        
   ])

   res.json({
       total,
       categorias
   })
}
// obtenerCategoria - populate {}

const obtenerCategoriaId = async ( req, res = response ) => {

      const { id } = req.params
      const query = {estado: true}
      
      const [ categoria] = await Promise.all ([
          Categoria.findById( id ).populate('usuario', 'nombre').find(query)
      ])

      
      res.json( {
          categoria
    } )

}
// obtenerCategorias - paginado - total  - populate

const crearCategoria = async ( req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    
    const categoriaDB = await Categoria.findOne({ nombre })
    
    console.log(categoriaDB);

    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data )

    //Guardar db
    await categoria.save()

    res.status(201).json(categoria)

}


// actualizarCategoria
const actualizarCategoria = async (req, res = response ) => {

    const { id } = req.params 
    const { estado, usuario , ...data} = req.body;


    data.nombre = data.nombre.toUpperCase()
    data.usuario = data._id

    
    
    const categoria = await Categoria.findByIdAndUpdate( id , data , { new: true })



    res.json( categoria )



}
// borrarCategoria - estado:false
const borrarCategoria = async (req, res = response ) => {

    const { id } = req.params 
    const categoria = await Categoria.findByIdAndUpdate( id , { estado: false })

    res.json( categoria )

}


module.exports ={
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
    obtenerCategorias,
    obtenerCategoriaId
}

