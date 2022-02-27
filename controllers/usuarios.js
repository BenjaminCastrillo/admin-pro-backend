const {response}=require("express");
const bcrypt=require("bcryptjs");
const Usuario=require("../models/usuario");
const { generarJWT }=require('../helpers/jwt');
const { findByIdAndUpdate } = require("../models/usuario");


const getUsuarios=async (req,res)=>{

  const usuarios= await Usuario.find({},'nombre email role google');

  res.json({
    ok:true,
    usuarios,
    uid:req.uid
  });

}

const crearUsuario=async(req,res=response)=>{

  const {email,password}=req.body;



  try{
  
    const existeEmail= await Usuario.findOne({email});

    if (existeEmail){
      return res.status(400).json({
        ok:false,
        msg:"El correo ya esta registrado"
      })
    }
    const usuario= new Usuario(req.body); 

    // encriptar contraseña
    const salt=bcrypt.genSaltSync(10);
   usuario.password=bcrypt.hashSync(password,salt);
  
    await usuario.save();

    const token= await generarJWT(usuario.uid);
   


    res.json({
      ok:true,
      usuario:usuario,
      token:token
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:"Error inexperado"
    })
  }

  
}
const actualizarUsuario=async(req,res=response)=>{
  const uid=req.params.id
 
  try{
    const usuarioDb= await Usuario.findById(uid);
    if (!usuarioDb){
      return res.status(404).json({
        ok:false,
        msg:"El usuario no existe"
      });
    }

    // Actualizaciones
    const {password,google,email, ...campos}=req.body;
    console.log('campos',campos);

    if(usuarioDb.email !== email){
    
      const existeEmail=await Usuario.findOne({email});
      if (existeEmail){
        return res.status(400).json({
          ok:false,
          msg:"Ya existe un usuario con este email"
        })
      }
    }

    campos.email=email;
    const usuarioActualizado=await Usuario.findByIdAndUpdate(uid,campos,{new:true});

    res.json({
      ok:true,
      usuario:usuarioActualizado
    })

  }
  catch(error){
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:"Error inexperado"
    })
  }

}

const borrarUsuario=async(req,res=response)=>{
  const uid=req.params.id
 
  try{
 
    const usuarioDb= await Usuario.findById(uid);
    if (!usuarioDb){
      return res.status(404).json({
        ok:false,
        msg:"El usuario no existe"
      });
    }
    await Usuario.findByIdAndDelete(uid);  
    res.json({
      ok:true,
      msg:"Usuario eliminado"
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:"Error inexperado"
    })
  }

}

module.exports={
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario
}