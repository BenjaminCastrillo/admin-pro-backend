const express = require("express");
const {dbconection} = require("./database/config");
require('dotenv').config();
const cors = require('cors');

const  app=express();


// BBDD
dbconection();

// Directorio público

app.use(express.static('public'));

// CORS
app.use(cors());

// lectura y parseo del Body
app.use(express.json());

// rutas

app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/todo',require('./routes/busquedas'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/upload',require('./routes/uploads'));


app.listen(process.env.PORT,()=>{
  
  console.log('Servidor corriendo en puerto '+ process.env.PORT);

});