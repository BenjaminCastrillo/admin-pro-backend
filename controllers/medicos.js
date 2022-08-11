const {response}=require("express");
const bcrypt=require("bcryptjs");
const Medico=require("../models/medico");
const Hospital=require("../models/hospital");
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
const getMedicoById=async (req,res)=>{
  const id=req.params.id;

  try{
    const medico= await Medico.findById(id)
    .populate('usuario','nombre')
    .populate('hospital','nombre');

    res.json({
      ok:true,
    medico:medico
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

  const id=req.params.id;
  const uid=req.uid;
  const hospitalId=req.body.hospital;
 
  try{

    const medico= await Medico.findById(id);

    if (!medico){
      return res.status(404).json({
        ok:false,
        msg:"Medico no encontrado"
      });

    }
    const hospital= await Hospital.findById(hospitalId);

    if (!hospital){
      return res.status(404).json({
        ok:false,
        msg:"Hospital no encontrado"
      });

    }

    const cambioMedico={
      ...req.body,
      usuario:uid
    };
  
    const medicoDB=await Medico.findByIdAndUpdate(id,cambioMedico, {new:true});

    
    res.json({
      ok:true,
      medicoDB
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

  const id=req.params.id;
 
  try{

    const medico= await Medico.findById(id);

    if (!medico){
      return res.status(404).json({
        ok:false,
        msg:"Medico no encontrado"
      });

    }
  
    const medicoDB=await Medico.findByIdAndDelete(id);

    
    res.json({
      ok:true,
      msg:"Medico eliminado"
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
  borrarMedico,
  getMedicoById

};