var UserProfile = require('../entity/User-profile');

function execute(userProfile, callback) {
    UserProfile.create(userProfile, callback);
}

module.exports = execute;