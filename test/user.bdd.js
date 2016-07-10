var User = require('../src/boundary/user');
var Database = require('./config/database');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
describe('User Service BDD', function() {
    var db = new Database();

    beforeEach(function(done) {
        return db.connect(done);
    });

    describe('GIVEN: I have firstname, lastname, username, password and email', function() {
        var firstname = 'Jerico';
        var lastname = 'de Guzman';
        var username = 'sample';
        var password = 'sample_pass';
        var email = 'sample@email.com';
        var registrationForm = {};

        beforeEach(function() {
            registrationForm.username = username;
            registrationForm.password = password;
            registrationForm.email = email;
            registrationForm.firstname = firstname;
            registrationForm.lastname = lastname;
        });

        describe('WHEN: saving user', function() {
            var savedResult;
            var userId;
            beforeEach(function(done) {
                User.register(registrationForm, function(err, userSavedResult) {
                    savedResult = userSavedResult;
                    userId = userSavedResult.userId;
                    done();
                });
            });

            it('THEN: response is user profile', function() {
                expect(!!savedResult).to.equal(true);
            });

            describe('GIVEN: I have userId', function() {
                describe('WHEN: getting userProfile', function() {
                    var userProfile;

                    beforeEach(function(done) {
                        User.getProfileByUserId(userId, function(err, userProfileResult) {
                            userProfile = userProfileResult;
                            done();
                        });
                    });

                    it('THEN: user profile is retrieved', function() {
                        expect(!!userProfile).to.equal(true);
                    });

                });
            });
        });
    });

    afterEach(function(done) {
        return db.disconnect(done);
    });
});