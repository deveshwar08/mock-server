const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = {
    loginPost:  async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.login(username, password);
            if(user instanceof User) {
                const id = user._id;
                const token = jwt.sign({id}, 'devesh server', {
                    expiresIn: 24 * 60 * 60
                });
                res.cookie('jwt', token,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.status(200).json({user: user._id});
                console.log("Logged in");
            } else {
                res.status(403).json({Message: "Invalid Username or Password!"});
                console.log("invlaid username or password");
            }
        } catch (err) {
            res.status(403).json({Message: "User not found"});
            console.log("Invalid user");
        }
    },
    signupPost: async (req, res) => {
        const {username, password} = req.body;

        try {
            const user = await User.create({username, password});
            const id = user._id;
                const token = jwt.sign({id}, 'devesh server', {
                expiresIn: 24 * 60 * 60
            });
            res.cookie('jwt', token,{ httpOnly: true, maxAge: (24 * 60 * 60 * 1000) });
            res.status(200).json({user: user._id});
        } catch (err) {
            res.status(400).json('Error: '+err);
        }
    },
    loginGet: async (req, res) => {
        res.render('login');
    },
    signupGet: async (req, res) => {
        res.render('signup');
    },
    logout: async (req, res) => {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    }
};