const Gpio = require('orange-pi-gpio');
const control = require('./control');

module.exports = {
   on_off_myroom_light : function(msg){
        var mesage = {};
        mesage.pin = 5;
        mesage.pinState = (msg.indexOf("on") !== -1)  ? 0 : 1;
        control.on_off(mesage);
    }
}