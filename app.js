var DirecTV = require('directv-remote');
var groveSensor = require('jsupm_grove');
var request = require('request');
var io = require('socket.io-client');
var connect = require('connect');
var serveStatic = require('serve-static');


var ipAddr = '10.10.30.245';

//DirecTV remote
var Remote = new DirecTV.Remote(ipAddr);
//socket
var socket = io.connect('http://mzserver.mybluemix.net:8081');

// Create the light sensor object using AIO pin 0
var light = new groveSensor.GroveLight(0);

var cabtimer =null;

//state variables
var sitting = 0;
var tookmeds = 0;
var couchtimer = null;



// Read the input and print both the raw value and a rough lux value,
// waiting one second between readings
function readLightSensorValue() {
    if(light.value() < 3) {
     sitting =1;
    }
    else sitting = 0;
}


function cabinet() {
    request('https://graph.api.smartthings.com/api/smartapps/installations/5c4c9922-153e-4eb2-a0c0-18677fbb7faf/contactSensors/7a8bc500-422d-4dd3-a8d4-82bfc5a965d4',
 function (error, response, body) {
     if (!error && response.statusCode == 200) {
        var obj = JSON.parse(body);
        if(obj.contact == 'open') {
            tookmeds = 1;
            Remote.webStop();
            clearInterval(cabtimer);
        }      
  }
 }).auth(null, null, true, '0373663b-9c6c-4f7e-af8a-8658cdbc352e');
}

function defaultMedia(person) {
    if(sitting == 1) {
         if(person=='jack') {
           if(tookmeds ==1) { 
               Remote.play('6');
           }
           else Remote.webStart('http://10.10.30.40:8080/meds.html');          
         }
         else{
             Remote.play('10');
         }
    }
}

connect().use(serveStatic(__dirname)).listen(8080);

setInterval(readLightSensorValue, 250);
cabtimer = setInterval(cabinet, 2000);


  socket.on('connect', function(){console.log('connected')});
  socket.on('presence', function(data){
      var presence = JSON.parse(data);
      couchtimer = setInterval(defaultMedia(presence.person),500);
  });
  socket.on('phone', function(data){
    if(sitting == 1) Remote.processKey('pause');
  });
  socket.on('speech', function(){
    Remote.play('1');
  });

  
  
  //socket.on('disconnect', function(){});


//Remote.getOptions();
//Remote.getPlayList();
//Remote.play('10'); //guardians
//Remote.play('1'); //football
//Remote.tune('206'); //espn
