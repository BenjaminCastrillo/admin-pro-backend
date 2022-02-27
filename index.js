const express = require("express");
const {dbconection} = require("./database/config");
require('dotenv').config();
const cors = require('cors');

const  app=express();


// BBDD
dbconection();
// CORS
app.use(cors());

// lectura y parseo del Body
app.use(express.json());

// rutas

app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/login',require('./routes/auth'))


app.listen(process.env.PORT,()=>{
  
  console.log('Servidor corriendo en puerto '+ process.env.PORT);

})