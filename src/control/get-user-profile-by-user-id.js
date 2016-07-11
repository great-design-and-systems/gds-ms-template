'use strict';
var UserProfile = require('../entity/User-profile');

function execute(userId, callback) {
    UserProfile.findOne({
        userId: userId
    }, callback);
}

module.exports = execute;