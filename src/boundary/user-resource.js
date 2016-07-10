var User = require('./user');
var NotFoundException = require('../control/not-found-exception');
var getRegisterResponse = require('../control/get-register-response');
var API = process.env.API_NAME || '/users/api/';

module.exports = function(app) {
    app.get(API + 'user-profile/:userId', function(req, res) {
        User.getProfileByUserId(req.params.id, function(err, result) {
            if (err) {
                res.status(404).send(new NotFoundException('User profile'));
            } else {
                res.status(200).send(result);
            }
        });
    });

    app.post(API + 'register', function(req, res) {
        User.register(req.body, function(err, result) {
            new getRegisterResponse(req, res, err, result);
        });
    });
};