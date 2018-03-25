const Gpio = require('orange-pi-gpio');
 
module.exports = {
   on_off : function(msg) {
       if(typeof msg === "string"){
        msg = JSON.parse(msg);
       }
       let gpio5 = this.getGpio( msg.pin || 5 );
       gpio5.write( +msg.pinState );
    },
    getGpio: function(pinNo){
        return new Gpio({pin: +pinNo });
    }
}
