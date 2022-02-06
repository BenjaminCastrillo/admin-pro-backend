const express = require("express");
const {dbconection} = require("./database/config");
require('dotenv').config();
const cors = require('cors');

const  app=express();


// BBDD
dbconection();
// CORS
app.use(cors());

// rutas


app.get('/',(req,res)=>{


  res.json({
    ok:true,
    msg:'hola mundo'
  })

})

app.listen(process.env.PORT,()=>{
  
  console.log('Servidor corriendo en puerto '+ process.env.PORT);

})