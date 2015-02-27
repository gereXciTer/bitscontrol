var util = require('util');
var pushserve = require('pushserve');
var express = require('express');
var http = require("http");
var request = require('request');

var app = express();
app.get('/', function (req, resp) {
  
  resp.send('<form action="/" method="GET" onsubmit=\'var j=[]; for(var i = 0; i < url.value.length; i++){ j.push(url.value[i]); } url.value = ""; document.getElementById("imageOut").src = "/show?url=" + JSON.stringify(j); return false; \'><input type="text" name="url" id="url" /><input type="submit" value="show" /></form><img id="imageOut" src="" style="max-width: 100%;" />');
});
app.get('/show', function (req, resp) {
  var url = req.query.url;
  if(Array.isArray(JSON.parse(req.query.url))){
    url = JSON.parse(req.query.url).join('');
  }
  if(!url){
    url = 'http://upload.wikimedia.org/wikipedia/commons/6/62/Clear.png';
  }
  request.get(url).pipe(resp).on('close', function(){
    console.log('sent');
  });
});
var server = app.listen(3456);