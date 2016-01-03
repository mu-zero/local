var DirecTV = require('directv-remote');
var ipAddr = '10.10.30.245';


var Remote = new DirecTV.Remote(ipAddr);

//Remote.getOptions();
//Remote.getPlayList();
//Remote.play('10'); //guardians
Remote.play('1'); //football
//Remote.tune('206'); //espn