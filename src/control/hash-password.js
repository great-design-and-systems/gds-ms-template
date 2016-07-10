var paswordHash = require('password-hash');
var PASSWORD_ALGO = process.env.PASSWORD_ALGO;
var PASSWORD_SALT_LENGTH = process.env.PASSWORD_SALT_LENGTH;
var PASSWORD_ITERATIONS = process.env.PASSWORD_ITERATIONS || 1;

function getOptions() {
    var options = {};
    if (PASSWORD_ALGO) {
        options.algorithm = PASSWORD_ALGO;
    }
    if (PASSWORD_SALT_LENGTH) {
        options.saltLength = PASSWORD_SALT_LENGTH;
    }
    if (PASSWORD_ITERATIONS) {
        options.iterations = PASSWORD_ITERATIONS;
    }
}

function execute(password, callback) {
    try {
        callback(undefined, paswordHash.generate(password, getOptions()));
    } catch (err) {
        callback(err);
    }
}

module.exports = execute;