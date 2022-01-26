

const { Router  } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, obtenerProductosId, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProducto, existeCategoriaPorId } = require('../helpers/db-validator');
const { validarJWT , validarCampos, esAdminRole} = require('../middlewares')


const router = Router();


router.get('/', obtenerProductos)

router.get('/:id', [
    check('id', 'No es un id valido' ).isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
],  obtenerProductosId )

router.post('/',  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id valido' ).isMongoId(),
    check('categoria',).custom( existeCategoriaPorId),
    validarCampos
], crearProducto)

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido' ).isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
] , actualizarProducto )

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valid').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
] , borrarProducto)


module.exports = router