const {Router} =require('express');
const {login,googleSignIn } = require('../controllers/auth');
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

router.post('/google',
[
  check('token','El token es obligatorio').not().isEmpty(),
  validarCampos
],googleSignIn);

// router.get('/',validarJWT,getTodo);

module.exports=router;