const {response}=require("express");
const bcrypt=require("bcryptjs");
const Hospital=require("../models/hospital");
const { generarJWT }=require('../helpers/jwt');


const getHospitales=async (req,res)=>{

  const hospitales= await Hospital.find()
                          .populate('usuario','nombre');
  res.json({
    ok:true,
    hospitales:hospitales
  });


};

const crearHospital=async(req,res=response)=>{

  const uid=req.uid;
  console.log(uid);
  const hospital= new Hospital(
    {usuario:uid,
      ...req.body
    }); 
  try{
    const hospitalDB= await hospital.save();

    res.json({
      ok:true,
      msg:hospitalDB
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
const actualizarHospital=async(req,res=response)=>{
 
  try{
    res.json({
      ok:true,
      msg:"actualizarHospital"
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

const borrarHospital=async(req,res=response)=>{

  try{
    res.json({
      ok:true,
      msg:"borrarHospital"
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
  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital
};