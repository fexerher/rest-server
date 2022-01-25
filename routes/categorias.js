

const { Router  } = require('express');
const { check } = require('express-validator');
const { crearCategoria, actualizarCategoria, borrarCategoria, obtenerCategorias, obtenerCategoriaId } = require('../controllers/categorias');

const { existeCategoria } = require('../helpers/db-validator');

const { validarJWT , validarCampos, esAdminRole} = require('../middlewares')


const router = Router();

/**
 *  {{URL}}/api/categorias
 */
//Obtener todas las categorias - publico 
router.get('/', obtenerCategorias)

//Obtener categoria por ID - publico
router.get('/:id', [
    check('id', 'No es un id valido' ).isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
],  obtenerCategoriaId)

//Crear categoria - privado - cualquier person con token valido
router.post('/',  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)

//Actualizar categoria
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido' ).isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
] , actualizarCategoria )


//Eliminar categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valid').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
] , borrarCategoria)




module.exports = router