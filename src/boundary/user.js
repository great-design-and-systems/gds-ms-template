'use strict';
var CreateUser = require('../control/create-user');
var CreateUserProfile = require('../control/create-user-profile');
var GetUserProfileByUsername = require('../control/get-user-profile-by-username');
var ValidateUser = require('../control/validate-user');
var ValidateEmail = require('../control/validate-email');
var InvalidUsernameException = require('../control/invalid-username-exception');
var InvalidEmailException = require('../control/invalid-email-exception');
var DeleteUser = require('../control/delete-user');
var DeleteUserProfileByUserId = require('../control/delete-user-profile-by-user-id');
var GetUserPasswordByUsername = require('../control/get-user-password-by-username');
module.exports = {
    register: function (registrationForm, callback) {
        var username = registrationForm.username;
        var email = registrationForm.email;
        new ValidateUser(username, function (validUsername) {
            if (validUsername) {
                new ValidateEmail(email, function (validEmail) {
                    if (validEmail) {
                        new CreateUser({
                            username: registrationForm.username,
                            password: registrationForm.password,
                            email: registrationForm.email
                        }, function (err, userResult) {
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
    getUserProfileByUsername: function (username, callback) {
        new GetUserProfileByUsername(username, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(undefined, result);
            }
        });
    },
    removeUser: function (userId, callback) {
        new DeleteUserProfileByUserId(userId, function (err) {
            if (!err) {
                new DeleteUser({
                    userId: userId
                }, function (err) {
                    if (!err) {
                        callback(undefined, {
                            message: 'User has been removed.'
                        });
                    } else {
                        callback(err);
                    }
                });
            } else {
                callback(err);
            }
        });
    },
    getUserPasswordByUsername: function (username, callback) {
        new GetUserPasswordByUsername(username, callback);
    }
};