const {Router} =require('express');
const {login } = require('../controllers/auth');
const { check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
// const {getTodo} = require('../controllers/busquedas');
// const {validarJWT} = require('../middlewares/validar-jwt');

const router=Router();

router.post('/',
[
  check('email','El email es obligatorio').isEmail(), 
  check('password','La password es obligatoria').not().isEmpty(),
  validarCampos
],login);

// router.get('/',validarJWT,getTodo);

module.exports=router;