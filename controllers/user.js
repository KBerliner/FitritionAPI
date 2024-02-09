const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();

// The "Test" Function

exports.test = (req, res, next) => {
    console.log('HIT');
    res.status(201).json({
        message: 'Tested Successfully!'
    })
}

// The "Signup" Function

exports.signup = (req, res, next) => {
    console.log(process.env);
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            let token = jwt.sign(
                { userId: user._id },
                process.env.JWT_VERIFICATION_CODE,
                { expiresIn: '2h' }
            );
            user.save().then(
                () => {
                    res.status(201).json({
                        message: 'User added successfully!',
                        username: req.body.username,
                        userId: user._id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            )
        }
    )
}

// The "Login" Function

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrect password!')
                        });
                    }

                    res.status(200).json({
                        userId: user._id,
                        username: user.username
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    })
                }
            )
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            })
        }
    )
}