const User = require('../../../app/Models/UserModel');
const Permission = require('../../../app/Models/PermissionModel');
const PermissionUser = require('../../../app/Models/PermissionUserModel');
const Token = require('../../../app/Models/TokenModel');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');
const v = new Validator();
const SignUp = require('../../../app/Mail/SignUp');
const ForgetPassword = require('../../../app/Mail/ForgetPassword');
const generatToken = require('../../../helpers/generateToken');

const AuthController = {
    //handleLogin,
    rememberMe,
    login,
    register,
    logout,
    forgetPassword,
    resetPassword,
    pub,
};

async function pub(req, res) {
    return res.status(200).json({
        state: null,
        message: null,
        data: null,
        errors: null
    });
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*|Json|Promise<any>>}
 */
async function login(req, res) {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    const refreshToken = jwt.sign(user.username, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generatToken.generateAccessToken(user.username, user.id);

    Token.findOne({
        where: {
            userId: user.id
        }
    })
        .then((result) => {
            if (result) {
                Token.update({
                    where: {
                        userId: user.id,
                    }
                })
            } else {
                Token.create({
                    token: accessToken,
                    userId: user.id,
                    //expireAt: {expiresIn: '150000s'},
                    state: 'ACTIVE',
                    //revoke: 0,
                }, {
                    include: {
                        model: User
                    }
                });
            }
        });

    const permissions = await PermissionUser.findAll({
        attributes: ['userId', 'permissionId'],
        where: {
            userId: user.id,
        },
        include: [
            {
                model: Permission,
                attributes: ['id', 'name']
            }
        ]
    });

    const roles = '';

    return res.status(200).json({
        state: true,
        message: "your are logged in!",
        data: {
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            isAdmin: user.isAdmin,
            permissions,
            roles,

            accessToken,
            refreshToken
        },
        errors: null
    });
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

/*async function handleLogin(req, res, next) {
    if (!req.body["RECAPTCHA_SITE_KEY"]) {
        return res.status(401).json({
            state: true,
            message: "rECAPTCHA is required!",
            data: null,
            errors: null
        });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body["RECAPTCHA_SITE_KEY"]}
    &remoteip=${req.connection.remoteAddress}`;

    const response = await fetch(verifyUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
    });

    await passport.authenticate("local", {
        successRedirect: "panel/dashboard",
        failureRedirect: "login",
        failureFlash: true
    })(req, res, next);
}*/

function rememberMe(req, res) {
    console.log(req.body.remember)
    if (req.body.remember) {
        req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000;
    } else {
        req.session.cookie.expire = null;
    }

    res.redirect("/panel/dashboard")
}

async function register(req, res) {
    const {first_name, last_name, username, email, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({first_name, last_name, username, email, password: hash});
    await SignUp.sendEmail(
        email,
        username,
        'welcome',
        'hello and welcome to my repository'
    );

    return res.status(201).json({
        state: true,
        message: "You are successfully registered!",
        data: null,
        errors: null
    });
}

async function logout(req, res) {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];
    let user = jwt.decode(token);

    await Token.destroy({
        where: {
            userId: user.id
        }
    })
        .then((result) => {
            if (result) {
                return res.status(200).json({
                    state: true,
                    message: "You are successfully logged out!",
                    data: null,
                    errors: null
                });
            }
        })
}

async function forgetPassword(req, res) {
    const {email} = req.body;
    console.log(req.body);
    console.log(email);
    const user = await User.findOne({
        email: email
    });
    if (!user) {
        return res
            .status(401)
            .json({
                state: false,
                message: "YunAuthorized!",
                data: null,
                errors: null
            });
    }

    const signature = generatToken.generateSignature(user.username, user.id);
    const resetLink = `http://localhost:3000/reset-password/${signature}`;
    await ForgetPassword.sendEmail(
        email,
        user.username,
        'Forget Password',
        `${resetLink}`
    );
    const forgetPassword = true;
    return res
        .status(200)
        .json({
            state: true,
            message: "Send Email successfully!",
            data: {
                data: forgetPassword
            },
            errors: null
        });
}

async function resetPassword(req, res) {
    await User.update(req.body.password, {
        where: {
            username: req.body.username
        }
    });

    const forgetPassword = false;
    console.log(forgetPassword);
    return res
        .status(200)
        .json({
            state: true,
            message: "reset password successfully!",
            data: {
                data: forgetPassword
            },
            errors: null
        });
}

module.exports = AuthController;
