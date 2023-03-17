var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var Schema = mongoose.Schema;

var deviceSchema = new Schema({
  uid: { type: Number },
  vendor: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: Boolean }
});


var gatewaySchema = new Schema({
  serial_number: { type: String, unique: true, required: [true, 'serial number is necessary'] },
  readable_name: { type: String, required: [true, 'name is necessary'] },
  ipv4_address: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}.\d{3}.\d{3}.\d{3}/.test(v);
      },
    },
    message: props => `${props.value} is not a valid address!`,
    unique: true, required: [true, 'ipv4 address required']
  },
  devices: [deviceSchema]
});

gatewaySchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('Gateway', gatewaySchema);

