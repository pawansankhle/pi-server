var  light =  { "on": 1, "off": 0};
const Gpio = require('orange-pi-gpio');
let gpio5 = new Gpio({pin:5});

module.exports = {
   on_off_myroom_light : function(msg){
        var action = msg.indexOf("on") ? 1 : 0;
        console.log("my room lights going to "+ action );
        gpio5.write(+action);
        
    }
}