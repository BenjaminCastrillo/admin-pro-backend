const {response}=require("express");
const bcrypt=require("bcryptjs");
const Medico=require("../models/medico");
const { generarJWT }=require('../helpers/jwt');


const getMedicos=async (req,res)=>{


  const medicos= await Medico.find()
  .populate('usuario','nombre')
  .populate('hospital','nombre');

  res.json({
    ok:true,
    medicos:medicos
  });


};

const crearMedico=async(req,res=response)=>{
  const uid=req.uid;
  console.log(uid);
  const medico= new Medico(
    {usuario:uid,
      ...req.body
    }); 

  try{
    const medicoDB= await medico.save();
    res.json({
      ok:true,
      msg:medicoDB
    });
 
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:"Error inexperado"
    });
  }

  
};
const actualizarMedico=async(req,res=response)=>{
  const uid=req.params.id;
 
  try{
    res.json({
      ok:true,
      msg:"actualizarMedico"
    });

  }
  catch(error){
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:"Error inexperado"
    });
  }

};

const borrarMedico=async(req,res=response)=>{

  try{
    res.json({
      ok:true,
      msg:"borrarMedico"
    });
  
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:"Error inexperado"
    });
  }

};

module.exports={
  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico

};