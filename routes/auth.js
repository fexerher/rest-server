

const { Router  } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, register } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty().trim().escape(),
    validarCampos
] ,login ); 

router.post('/register',[
    check('correo', 'El correo es obligatorio').isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatorio').trim().not().isEmpty().escape(),
    validarCampos
] , register ); 

router.post('/google',[
    check('id_token', 'Token de google es necesario').not().isEmpty(),
    validarCampos
] , googleSignIn ); 



module.exports = router;