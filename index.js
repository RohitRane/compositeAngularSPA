var express = require('express');
var config = require('./config');
var app = express();

app.use(express.static(config.publicRoot));

var htmlRoot = __dirname +config.htmlRoot;

app.get('/', function(req, res) {
    res.sendFile(htmlRoot+'/main.html');
});



var server = app.listen(3000, function() {
	var address = server.address();
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at :',address);
    
});
