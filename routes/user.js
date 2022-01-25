

const { Router  } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPatch, usuariosPost, usuariosDelete, obtenerUsuarioId } = require('../controllers/user');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole , tieneRole } = require('../middlewares/validar-roles');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares')


const router = Router();

router.get('/',  usuariosGet );

router.get('/:id',[
    validarJWT,
    check('id', 'id no valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], obtenerUsuarioId )

router.patch('/',  usuariosPatch);  

router.put('/:id',[
    check('id', 'No es un id valido' ).isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRoleValido ),
    validarCampos
] , usuariosPut);


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password tiene que ser más de 6 digitos').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol valido').isIn(),
    check('role').custom( esRoleValido ),
    validarCampos
] ,usuariosPost);  

router.delete('/:id', [
    validarJWT,
    esAdminRole, 
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido' ).isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);



module.exports = router


