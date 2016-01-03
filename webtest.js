var DirecTV = require('directv-remote');
var connect = require('connect');
var serveStatic = require('serve-static');
var ipAddr = '10.10.30.245';
var Remote = new DirecTV.Remote(ipAddr);

connect().use(serveStatic(__dirname)).listen(8080);
Remote.webStart('http://10.10.30.141:8080/meds.html');   
Remote.getPlayList();  