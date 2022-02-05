
const { Router  } = require('express');
const { check, body } = require('express-validator');
const { buscarCarritoProducto, obtenerTotalCarrito } = require('../controllers/carrito');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/', validarCampos , buscarCarritoProducto ); 

router.get('/' ,[
    check("productos.*.nombre", 'El nombre es obligatorio').not().isEmpty(),
    check("productos.*.cantidad", 'La cantidad es obligatoria').not().isEmpty(),
    check("productos.*.envio", 'El envio es obligatorio').not().isEmpty(),
    validarCampos
] ,  obtenerTotalCarrito ); 


module.exports = router;