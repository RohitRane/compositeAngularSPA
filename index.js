var express = require('express');
var config = require('./config');
var app = express();

app.use(config.public,express.static(config.publicRoot));

app.use(config.pages,express.static(config.pagesRoot));

var pagesRoot = __dirname +config.pagesRoot;

app.get('/', function(req, res) {
	var page = pagesRoot + '/'+config.homePage+'/'+config.homePage+'.html';
    res.sendFile(page);
});

app.get('/me', function(req, res) {
	var page = pagesRoot + '/'+config.myInfoPage+'/'+config.myInfoPage+'.html';
    res.sendFile(page);
});

var server = app.listen(3000, function() {
	var address = server.address();
    var host = server.address().address;
    var port = server.address().port;

    console.log('This App is listening at port :',port);

});
