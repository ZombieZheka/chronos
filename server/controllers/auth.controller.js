// server/controllers/index.controller.js

const bcryptjs = require('bcryptjs');
const {
    User
} = require(process.env.MODELS);
const generateJWT = require("../helpers/jwt");

module.exports = {
    // post register
    register: async (req, res, next) => {
        const {
            name,
            email,
            password,
            // color
        } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({
                        ok: false,
                        msg: "User email already exists"
                    });
            }

            // Create a new user object
            user = new User({
                name,
                email,
                password,
            });

            // Save the user to the database
            await user.save();

            // Login user
            next();
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({
                    ok: false,
                    msg: "Register Error"
                });
        }
    },
    // post login
    login: async (req, res, next) => {
        const {
            email,
            password
        } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({
                        ok: false,
                        msg: 'User with this email doesn\'t exist'
                    });
            }

            const validPassword = await bcryptjs.compare(password, user.password);
            if (!validPassword) {
                return res
                .status(401)
                .json({
                    ok: false,
                    msg: "Invalid password",
                });
            }

            const token = await generateJWT(user.id, user.name);
            res.cookie('token', token, {
                httpOnly: true,
                secure: true
            });

            return res
                .status(200)
                .json({
                    ok: true,
                    user,
                    token
                });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({
                    ok: false,
                    msg: "Login Error"
                });
        }
    },
    // post logout
    logout: (req, res, next) => {
        res.clearCookie('token');

        return res
            .status(500)
            .json({
                ok: true,
                msg: 'You are logged out'
            });
    }
};
