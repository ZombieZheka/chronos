// routes/auth.router.js

const express = require('express');
const router = express.Router();
const path = require("path");

const controllers = process.env.CONTROLLERS;
const controller = path.join(controllers, "auth.controller");

const {
    register,
    login,
    logout
} = require(controller);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
