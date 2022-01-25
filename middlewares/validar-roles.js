const { response } = require("express")



const esAdminRole = (req, res = response, next) => {

    if( !req.usuario){
        return res.status(500).json({
            msg: 'Se quire verificar el role sin validar el token primero'
        })
    }

    const { role, nombre } = req.usuario
    console.log(role);
    if ( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `Permisos insuficientes`
        })
    }


    next()
}
const tieneRole = ( ...roles ) => {

    return ( req, res = response, next) => {

        if( !req.usuario){
            return res.status(500).json({
                msg: 'Se quire verificar el role sin validar el token primero'
            })
        }

        if( !roles.includes( req.usuario.role ) ){
            return res.status(401).json({
                msg: `No role indentified`
            })
        }

        next()
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}