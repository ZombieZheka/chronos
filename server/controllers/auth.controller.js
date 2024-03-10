// server/controllers/index.controller.js

module.exports = {
    // post register
    register: (req, res, next) => {
        const {
            username,
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation
        } = req.body;
        res.send('register: NOT IMPLEMENTED');
    },
    // post login
    login: (req, res, next) => {
        res.send('login: NOT IMPLEMENTED');
    },
    // post logout
    logout: (req, res, next) => {
        res.send('logout: NOT IMPLEMENTED');
    }
};
