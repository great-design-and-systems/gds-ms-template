var User = require('../entity/User');

function execute(param, callback) {
    User.remove(param, callback);
}

module.exports = execute;