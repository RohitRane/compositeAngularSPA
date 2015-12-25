var express = require('express');
var config = require('./config');
var app = express();

app.use(config.public,express.static(config.publicRoot));

app.use(config.pages,express.static(config.pagesRoot));

var domainRoot = __dirname +config.domainRoot;

app.get('/', function(req, res) {
    res.sendFile(domainRoot+config.pageName);
});



var server = app.listen(3000, function() {
	var address = server.address();
    var host = server.address().address;
    var port = server.address().port;

    console.log('This App is listening at port :',port);

});
