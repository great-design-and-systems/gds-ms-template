var API = process.env.API_NAME || '/users/api/';

function execute(req, res, err, result) {
    if (err) {
        res.status(500).send({
            message: 'Registration failed.',
            error: err
        });
    } else {
        res.status(200).send({
            message: 'Registration completed.',
            links: {
                profile: 'http://' + req.headers.host + API + 'user-profile/' + result.userId
            }
        });
    }
}

module.exports = execute;