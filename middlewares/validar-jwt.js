
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async ( req, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        
        return res.status(401).json({
            msg: 'No hay toke en la petición'
        })

    }
    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        //ller el modelo usaurio que correspoden al uid

        const usuario = await Usuario.findById( uid ) 

        if( !usuario ){
            return res.status(401).json({
                msg: 'Token no válido'
            })
        }

        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no válido'
            })
        }
        
        req.usuario = usuario

        next()
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

    
}

module.exports = {
    validarJWT
}