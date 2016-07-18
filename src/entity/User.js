var mongoose = require('mongoose');
var ValidateEmailFormat = require('../control/validate-email-format');
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    email: {
        type: String,
        validate: {
            validator: ValidateEmailFormat.execute,
            messsage: "{VALUE} is not a valid email address."
        },
        require: [true, 'Email is required.']
    },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', UserSchema);
