var express = require('express');

var app = express();

app.get('/', (req, res)=>{
    res.status(200).json(
      {
        ok:true,
        message:'Everything is OK' 
      }
    )
   
 })

 module.exports = app;