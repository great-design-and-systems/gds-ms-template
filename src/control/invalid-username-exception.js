'use strict';
module.exports = function(callback) {
    return callback({
        exception: 'InvalidUsernameException',
        message: 'Username already exists.'
    });
};