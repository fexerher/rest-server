

const { Router  } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');


const router = Router();


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
] ,login ); 

router.post('/google',[
    check('id_token', 'Token de google es necesario').not().isEmpty(),
    validarCampos
] , googleSignIn ); 

router.post('/admin', [
    validarJWT,
    esAdminRole,
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
], login )

module.exports = router;