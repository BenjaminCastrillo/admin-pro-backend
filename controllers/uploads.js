const {response}=require("express");
const path=require("path");
const fs=require("fs");
const bcrypt=require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen}= require("../helpers/actualizar-imagen");

const fileUpload=async (req,res)=>{

  const tipo = req.params.tipo; 
  const id = req.params.id; 
  const tiposValidos=['usuarios','medicos','hospitales'];

  if (!tiposValidos.includes(tipo)){
    res.status(400).json({
      ok:false,
      msg:'El tipo es erroneo'
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok:false,
      msg:'No se envió ningún archivo'
    });
  }

  // procesar imagen
  const imagen = req.files.image;  // el files viene del midleware expressFileUpload que ejecutamos en la ruta

  console.log(imagen);
  const nombreCortado= imagen.name.split('.');
  const extension=nombreCortado[nombreCortado.length-1];

  // validar extension
  const extensionesVallidas=['png','jpg','jpeg','gif'];

  if (!extensionesVallidas.includes(extension)){
    return res.status(400).json({
      ok:false,
      msg:'La extension del archivo es incorrecta'
    });
  }

  // Generar el nombre de la imagen
  const nombreArchivo=`${uuidv4()}.${extension}`;

  const pathArchivo=`./uploads/${tipo}/${nombreArchivo}`;


   // Use the mv() method to place the file somewhere on your server
   imagen.mv(pathArchivo, (err) => {
      if (err){
        console.log('ERROR',err);
        return res.status(500).json({
          ok:false,
          msg:'Error en el servidor, no se pudo cargar la imagen'
        });
      }

      // Actualizar BBDD

      actualizarImagen(tipo,id,nombreArchivo);

      res.json({
        ok:true,
        msg:"Archivo subido",
        nombre:nombreArchivo
      });
    });
  };

  const retornaImagen=async (req,res=response)=>{

      const tipo = req.params.tipo; 
      const imagen = req.params.imagen;
      const pathImg= path.join (__dirname,`../uploads/${tipo}/${imagen}`); 

// imagen por defecto

    if (fs.existsSync(pathImg))
    {
      res.sendFile(pathImg);
    }else{
      res.sendFile(path.join (__dirname,'../uploads/no-img.jpg'));

    }

  };
 



module.exports={
  fileUpload,
  retornaImagen,
};
