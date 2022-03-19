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

  const id=req.params.id;
  const uid=req.uid;
 
  try{

    const hospital= await Hospital.findById(id);

    if (!hospital){
      return res.status(404).json({
        ok:false,
        msg:"Hospital no encontrado"
      });

    }

    const cambioHospital={
      ...req.body,
      usuario:uid
    };
  
    const hospitalDB=await Hospital.findByIdAndUpdate(id,cambioHospital, {new:true});

    
    res.json({
      ok:true,
      hospitalDB
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

  const id=req.params.id;
 
  try{

    const hospital= await Hospital.findById(id);

    if (!hospital){
      return res.status(404).json({
        ok:false,
        msg:"Hospital no encontrado"
      });

    }
  
    const hospitalDB=await Hospital.findByIdAndDelete(id);

    
    res.json({
      ok:true,
      msg:"Hospital eliminado"
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