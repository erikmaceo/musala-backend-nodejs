//Requires
var express = require('express');
var mongoose = require('mongoose');

//variable
var app = express();

//JSON
app.use(express.json());

//import routes
var appRoutes = require('./routes/app');
var gatewayRoutes = require('./routes/gateway');

// connection DB//
async function main(){
    await mongoose.connect('mongodb://localhost:27017/gatewayDB');
  }
  
  main().then(db => console.log('DB is connect'));
  
  main().catch(error => console.log(error) );

//routes
app.use('/', appRoutes);
app.use('/gateways', gatewayRoutes);

app.listen(8080, ()=>{
    console.log('Running in Port: 8080');
})