module.exports = function(callback) {
    return callback({
        exception: 'InvalidEmailException',
        message: 'Email already exists.'
    });
};