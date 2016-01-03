var DirecTV = require('directv-remote');
var groveSensor = require('jsupm_grove');
var ipAddr = '10.10.30.245';


var Remote = new DirecTV.Remote(ipAddr);

// Create the light sensor object using AIO pin 0
var light = new groveSensor.GroveLight(0);

// Read the input and print both the raw value and a rough lux value,
// waiting one second between readings
function readLightSensorValue() {
    console.log(light.name() + " raw value is " + light.raw_value() +
            ", which is roughly " + light.value() + " lux");
}
setInterval(readLightSensorValue, 1000);

//Remote.getOptions();
//Remote.getPlayList();
//Remote.play('10'); //guardians
//Remote.play('1'); //football
//Remote.tune('206'); //espn