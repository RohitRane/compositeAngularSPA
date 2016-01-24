var express = require('express');
var config = require('./config');
var app = express();

app.projectDir = __dirname;

require('./app/server/routes.js')(app);

var server = app.listen(3000, function() {
    var address = server.address();
    var host = server.address().address;
    var port = server.address().port;

    console.log('This App is listening at port :', port);

});

