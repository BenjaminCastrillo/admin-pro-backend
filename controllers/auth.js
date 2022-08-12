
const  { response } =require('express');
const Usuario  =require('../models/usuario');
const bcrypt=require('bcryptjs');
const {generarJWT}=require('../helpers/jwt');
const {googleVerify}=require('../helpers/google-verify');
const {ObjectId} = require('mongodb');
const {getMenuFrontEnd} = require('../helpers/menu-frontend');

const login=async(req,res=response)=>{

  const {email,password}=req.body;

  try{

    // Verificar email
    const usuarioDB = await Usuario.findOne({email});

    if (!usuarioDB){

     return res.status(404).json({
       ok:false,
       msg:'email no valido' 
     });
    }
    // Verificar contraseña

    const validPassword=bcrypt.compareSync(password,usuarioDB.password);

    if (!validPassword){
      return res.status(404).json({
        ok:false,
        msg:'Contraseña no valida'
      });
    }

    // generar el token

    const token= await generarJWT(usuarioDB.id);

    res.json({
      ok:true,
      token:token,
      menu:getMenuFrontEnd(usuarioDB.role)
    });

  }
  catch(error){
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Hable con el administrador'

    });

  }

};
const googleSignIn=async(req,res=response)=>{

  const googleToken=req.body.token;

  try{

    console.log(googleToken);
    const {name,email,picture}= await googleVerify(googleToken);
    let usuario;
    const usuarioDB= await Usuario.findOne({email});
    
    if (!usuarioDB){
      usuario= new Usuario({
        nombre:name,
        email,
        password:'@@@',
        img:picture,
        google:true
      });
    }else{
      usuario=usuarioDB;
      usuario.google=true;
    }

    await usuario.save();
    const token= await generarJWT(usuario.id);

    console.log('Login CORRECTO');
    res.json({
      ok:true,
      token:token,
      menu:getMenuFrontEnd(usuario.role)
    });
  }catch (error) {
    res.status(401).json({
      ok:false,
      msg:"token erroneo",
      googleToken
    });

  }
};

const renewToken=async(req,res=response)=>{

  console.log('RENOVANDO TOKEN');
  const uid=(req.uid);

  const token= await generarJWT(uid);


  try{
    const usuario= await  Usuario.findById({_id:ObjectId(uid)});

    if (!usuario){
      return res.status(404).json({
        ok:false,
        msg:'Error, usuario no encontrado' 
      });
    }

    res.json({
      ok:true,
      token,
      usuario,
      menu:getMenuFrontEnd(usuario.role)
    });
  } catch(error){
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Error interno Contacte con el administrador'
    });
  }
  return
};
module.exports={
  login,
  googleSignIn,
  renewToken
};