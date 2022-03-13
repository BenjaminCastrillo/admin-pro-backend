const {response}=require("express");
const Usuario=require("../models/usuario");
const Hospital=require("../models/hospital");
const Medico=require("../models/medico");

const getTodo= async (req,res=response)=>{

  const busqueda= req.params.busqueda;
  const regex= new RegExp(busqueda,'i');

  const [usuarios,medicos,hospitales]= await Promise.all([
      Usuario.find({nombre:regex}),
      Medico.find({nombre:regex}),
      Hospital.find({nombre:regex}),
  ]);

  res.json({
    ok:true,
    usuarios,
    medicos,
    hospitales
  });

};

const getDocumentoColeccion= async (req,res=response)=>{

  const busqueda= req.params.busqueda;
  const tabla= req.params.tabla;
  const regex= new RegExp(busqueda,'i');

  const [usuarios,medicos,hospitales]= await Promise.all([
      Usuario.find({nombre:regex}),
      Medico.find({nombre:regex}),
      Hospital.find({nombre:regex}),
  ]);

  let resultado=null;
  switch(tabla){

    case 'medicos':
       resultado= await Medico.find({nombre:regex})
                      .populate('hospital','nombre')
                      .populate('usuario','nombre');
      break;
      case 'hospitales':
       resultado= await Hospital.find({nombre:regex})
                  .populate('usuario','nombre');;
      break;
      case 'usuarios':
       resultado= await Usuario.find({nombre:regex});

      break;
      default:
        return res.status(400).json({
          ok:false,
          msg:'La tabla no existe'
        });
  }

  res.json({
    ok:true,
    Resultado:resultado
  });

};

module.exports={
  getTodo,
  getDocumentoColeccion
}
;
