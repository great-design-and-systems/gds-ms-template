var CreateUser = require('../control/create-user');
var CreateUserProfile = require('../control/create-user-profile');
var GetUserProfileByUserId = require('../control/get-user-profile-by-user-id');
var ValidateUser = require('../control/validate-user');
var ValidateEmail = require('../control/validate-email');
var InvalidUsernameException = require('../control/invalid-username-exception');
var InvalidEmailException = require('../control/invalid-email-exception');
var lodash = require('lodash');
module.exports = {
    register: function(registrationForm, callback) {
        var username = registrationForm.username;
        var email = registrationForm.email;
        new ValidateUser(username, function(validUsername) {
            if (validUsername) {
                new ValidateEmail(email, function(validEmail) {
                    if (validEmail) {
                        new CreateUser({
                            username: registrationForm.username,
                            password: registrationForm.password,
                            email: registrationForm.email
                        }, function(err, userResult) {
                            if (err) {
                                callback(err);
                            } else {
                                new CreateUserProfile({
                                    userId: userResult._id,
                                    firstname: registrationForm.firstname,
                                    lastname: registrationForm.lastname
                                }, callback);
                            }
                        });
                    } else {
                        new InvalidEmailException(callback);
                    }
                });
            } else {
                new InvalidUsernameException(callback);
            }
        });
    },
    getProfileByUserId: function(userId, callback) {
        new GetUserProfileByUserId(userId, function(err, result) {
            if (err) {
                callback(err);
            } else {
                lodash.unset(result, 'userId');
                lodash.unset(result, '_id');
                callback(undefined, result);
            }
        });
    }
};