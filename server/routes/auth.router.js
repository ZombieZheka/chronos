// server/routes/index.router.js

const path = require('path');

const express = require('express');
const router = express.Router();

const { auth } = require(process.env.CONTROLLERS);

// register
router.post('/register', auth.register);

// login
router.post('/login', auth.login);

// logout
router.post('/logout', auth.logout);

module.exports = router;