
const jwt=require('jsonwebtoken');

const validarJWT=(req,res,next)=>{


  //leer token

  const token=req.header('x-token');



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
module.exports={
  validarJWT,
};