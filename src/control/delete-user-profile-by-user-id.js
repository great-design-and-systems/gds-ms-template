var UserProfile = require('../entity/User-profile');

function execute(userId, callback) {
    UserProfile.remove({
        userId: userId
    }, callback);
}

module.exports = execute;