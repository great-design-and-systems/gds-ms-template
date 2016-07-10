var mongoose = require('mongoose');

module.exports = function() {
    var PORT = process.env.DB_PORT || 27017;
    var HOST = process.env.DB_HOST || 'localhost';
    var DB = process.env.DB || 'test';
    var USER = process.env.DN_USER;
    var PASSWORD = process.env.DB_PASSWORD;

    mongoose.connect(getDBUrl());

    function getDBUrl() {
        var url = 'mongodb://';
        if (USER && PASSWORD) {
            url += USER;
            url += PASSWORD;
            url += '@';
        }
        url += HOST;
        url += ':';
        url += PORT;
        url += '/';
        url += DB;
        console.log('mongo:' + url);
        return url;
    }
};