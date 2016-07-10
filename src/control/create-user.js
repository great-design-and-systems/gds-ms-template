var User = require('../entity/User');
var HashPassword = require('./hash-password');

function execute(user, callback) {
    new HashPassword(user.password, function(err, password) {
        user.password = password;
        User.create(user, callback);
    });
}

module.exports = execute;