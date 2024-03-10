// server/controllers/layout.controller.js

module.exports = {
    isAuth: (req, res, next) => {
        req.auth = false;
        next();
    }
};
