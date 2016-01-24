"use strict";

var mongoose = require('mongoose/');

mongoose.connect('mongodb://localhost:27017/compositeSPAdb');

var Schema = mongoose.Schema;
var UserDetail = new Schema({
      username: String,
      password: String
    }, {
      collection: 'userInfo'
    });
var UserDetails = mongoose.model('userInfo', UserDetail);

module.exports = UserDetails;