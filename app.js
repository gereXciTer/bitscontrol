/**
* Created with bitscontrol.
* User: exciter
* Date: 2014-12-01
* Time: 09:56 PM
* To change this template use Tools | Templates.
*/
var pushserve = require('pushserve');
pushserve({port: 3333, indexPath: 'public/index.html', noCors: false}, function() {
  console.log('Launched');
});
