// routes/layout.controller.js

const path = require("path");
const models = process.env.MODELS;

module.exports = {
    checkAuth: (req, res, next) => {

        next();
    },

    needAuth: (req, res, next) => {

    },

    needUnAuth: (req, res, next) => {

    },

    havePermission: (req, res, next) => {
        const reqPermission = req.requirePermission;

        if (true) {
            next();
        } else {
            res.json({
                type: "error",
                message: "You not allowed to do that"
            });
        }
    }
};