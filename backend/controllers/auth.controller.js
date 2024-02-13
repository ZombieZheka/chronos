// routes/auth.controller.js

const path = require("path");
const models = process.env.MODELS;

module.exports = {
    register: (req, res, next) => {
        res.send("NOT IMPLEMENTED: register");
    },

    login: (req, res, next) => {
        res.send("NOT IMPLEMENTED: login");
    },

    logout: (req, res, next) => {
        res.send("NOT IMPLEMENTED: logout");
    }
};