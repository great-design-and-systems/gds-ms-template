'use strict';
var User = require('../entity/User');

function execute(email, callback) {
    User.findOne({
        email: email
    }, function(err, user) {
        if (user === null) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

module.exports = execute;