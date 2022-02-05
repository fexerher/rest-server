
const { Router  } = require('express');
const { check } = require('express-validator');
const { buscarCarritoProducto } = require('../controllers/carrito');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/', validarCampos , buscarCarritoProducto ); 




module.exports = router;