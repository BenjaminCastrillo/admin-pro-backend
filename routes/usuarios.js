const {Router} =require('express');
const {getUsuarios,crearUsuario,actualizarUsuario, borrarUsuario} = require('../controllers/usuarios');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT,validarADMIN_ROLE,validarADMIN_ROLE_o_MismoUsuario} = require('../middlewares/validar-jwt');
const router=Router();

router.get('/',validarJWT,getUsuarios);
router.post('/',
[
  check('nombre','El nombre es obligatorio').not().isEmpty(),
  check('password','La password es obligatoria').not().isEmpty(),
  check('email','Tiene que ser un email valido').isEmail(),
  validarCampos
],crearUsuario);

router.put('/:id',
[
      validarJWT,
      validarADMIN_ROLE_o_MismoUsuario,
      check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('email','Tiene que ser un email valido').isEmail(),
     check('role','El rol es obligatorio').not().isEmpty(),
     validarCampos,
    ],
actualizarUsuario);

router.delete('/:id',
  [  validarJWT,
    validarADMIN_ROLE
  ],
    borrarUsuario);

module.exports=router;