var express = require('express');

var appGateway = express();

//import Gateway's Schema
var Gateway = require('../models/gateway')

//=============================
//  Get all Gateways
//=============================

const getGateways = async (req, res) => {

    const gateways = await Gateway.find({}).exec()
    //usamos el la query find() de mongoose
    res.status(200).json({
        ok: true,
        gateways
    })

    console.log(
        gateways
    )
}

//=============================
// Post Gateway
//=============================
const postGateway = async (req, res) => {

    //destructuring javascript
    const { serial_number, readable_name, ipv4_address } = req.body;

    const newGateway = new Gateway({ serial_number, readable_name, ipv4_address }); 

    await newGateway.save(function (err) {
       
        if (err) {

            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.status(201).json({
                ok: true,
                newGateway
            });
        }
    })
}

//=============================
// Get one Gateway
//=============================
const getOneGatewaybyId = async (req, res) => {
    const gateway = await Gateway.findById(req.params.idGateway); 
    res.status(200).json(gateway)
}

//===================================================
// Push a device in Gateway's devices by id
//===================================================
const getOneDeviceInGateway = async (req, res) => {

    const gateway = await Gateway.findById(req.params.idGateway); 

    if( gateway.devices.length < 10){
       
        gateway.devices.push(req.body)

        gateway.save(function (err) {

            if (err) {
    
                res.status(400).json({
                    ok: false,
                    error: err
                })
    
            } else {
                res.status(201).json({
                    ok: true,
                    gateway : gateway.devices
                });
            }
        })

    } else {
        res.status(400).json({
            ok: false,
            messagge :'that is full',
        })

    }

}

//===================================================
// Delete a device in Gateway's devices by id
//===================================================

const deleteOneDeviceInGateway = async (req, res) => {

    const device = req.params.idDevice;

    const gateway = await Gateway.findById(req.params.idGateway);

    var test = 0

    for (let gate of gateway.devices) {

        if (gate._id == device) {

            test = gateway.devices.indexOf(gate)
        }
    }

    gateway.devices.splice(test, 1);

    gateway.save(function (err) {
        console.log(err)}
        )

    res.status(200).json(gateway)
}



appGateway.get('/', getGateways);

appGateway.get('/:idGateway', getOneGatewaybyId);

appGateway.get('/:idGateway/device', getOneDeviceInGateway);

appGateway.get('/:idGateway/:idDevice', deleteOneDeviceInGateway);

appGateway.post('/', postGateway);


module.exports = appGateway;