const mongoose = require('mongoose');


const dbconection= async()=>{

  // Usuario BBDD  Benjamin OsRi5cLgRrw6JcI4
 
  try{

    await mongoose.connect(process.env.DB_CNN);
    console.log('BBDD online');
  }
  catch(error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos") // esto detiene la ejecucion del programa

  }


}
module.exports={
  dbconection
}