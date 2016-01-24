var express = require('express');
var config = require('../../config');

module.exports = function(app) {
    console.log("App :", app);

    app.use(config.public, express.static(config.publicRoot));

    app.use(config.pages, express.static(config.pagesRoot));

    console.log("Initializing server routes.");

    var pagesRoot = app.projectDir+ config.pagesRoot;

    //Define your routes here.
    app.get('/', function(req, res) {
        var page = pagesRoot + '/' + config.homePage + '/' + config.homePage + '.html';
        res.sendFile(page);
    });

    app.get('/me', function(req, res) {
        var page = pagesRoot + '/' + config.myInfoPage + '/' + config.myInfoPage + '.html';
        res.sendFile(page);
    });

}
