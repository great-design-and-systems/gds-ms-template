'use strict';
var User = require('../entity/User');

function execute(username, callback) {
    User.findOne({ username: username }, function (err, result) {
        if (err) {
            callback({
                message: 'Password not found.'
            });
        } else {
            callback(undefined, { password: result.password });
        }
    });
}

module.exports = execute;