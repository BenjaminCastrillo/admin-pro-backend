/*
ruta: api/uploads

*/

const {Router} =require('express');
const expressFileUpload = require('express-fileupload');
const {validarJWT} = require('../middlewares/validar-jwt');
const {fileUpload, retornaImagen} = require('../controllers/uploads');




const router=Router();

// el router y el express funcionan igual para el user
router.use(expressFileUpload());

router.put('/:tipo/:id',validarJWT,fileUpload);
// router.get('/:tipo/:imagen',validarJWT,retornaImagen);
router.get('/:tipo/:imagen',retornaImagen);

module.exports=router;