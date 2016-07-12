'use strict';
var UserProfile = require('../entity/User-profile');
var User = require('../entity/User');

function execute(username, callback) {
    User.findOne({
        username: username
    }, function(err, result) {
        if (err) {
            callback({
                message: 'User not found.'
            });
        } else {
            UserProfile.findOne({
                userId: result._id
            }, function(err, userProfileResult) {
                if (err) {
                    callback({
                        message: 'User profile not found'
                    });
                } else {
                    userProfileResult._id = undefined;
                    userProfileResult.userId = undefined;
                    callback(undefined, userProfileResult);
                }
            });
        }
    });

}

module.exports = execute;