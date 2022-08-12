
const jwt=require('jsonwebtoken');

const Usuario=require('../models/usuario');

const validarJWT=(req,res,next)=>{


  //leer token

  const token=req.header('x-token');


console.log('estoy aqui',token);
  if (!token){

    return res.status(401).json({
          ok:false,
          msg:'No hay toten en la petición'
    });
  }

  try{

    console.log(token)
    const {uid} =jwt.verify(token,process.env.JWT_SECRET);

    req.uid=uid;
    next();
  } 
  catch (error){
    return res.status(401).json({
      ok:false,
      msg:'Token no valido'
    });

  }



};

const validarADMIN_ROLE= async (req,res,next)=>{

  const uid=req.uid;

  try{
    const usuarioDB= await Usuario.findById(uid);
    
    if (!usuarioDB)
    {
      return res.status(404).json({
        ok:false,
        msg:'usuario no existe'
      });
    }

    if (usuarioDB!=='ADMIN_ROLE'){
      return res.status(403).json({
        ok:false,
        msg:'No tiene privilegios para hacer eso'
      });
    }

    next();
  }
  catch(err){

    console.log(err);
    res.status(500).json({
      ok:false,
      msg:'hable con el administrador'
    });
  }
};
const validarADMIN_ROLE_o_MismoUsuario= async (req,res,next)=>{

  const uid=req.uid;
  const id=req.params.id;

  try{
    const usuarioDB= await Usuario.findById(uid);
    
    if (!usuarioDB)
    {
      return res.status(404).json({
        ok:false,
        msg:'usuario no existe'
      });
    }

    if (usuarioDB==='ADMIN_ROLE' ||  uid===id){
      next();
    }else{
      return res.status(403).json({
        ok:false,
        msg:'No tiene privilegios para hacer eso'
      });
    }

    next();
  }
  catch(err){

    console.log(err);
    res.status(500).json({
      ok:false,
      msg:'hable con el administrador'
    });
  }
};

module.exports={
  validarJWT,
  validarADMIN_ROLE,
  validarADMIN_ROLE_o_MismoUsuario,
};