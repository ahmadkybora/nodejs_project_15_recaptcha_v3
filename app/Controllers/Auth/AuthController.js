const User = require('../../../app/Models/UserModel');
const Permission = require('../../../app/Models/PermissionModel');
const PermissionUser = require('../../../app/Models/PermissionUserModel');
const Token = require('../../../app/Models/TokenModel');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');
const v = new Validator();
const generateAccessToken = require('../../../helpers/generateAccessToken');
const SignUp = require('../../../app/Mail/SignUp');

const AuthController = {
    handleLogin,
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
    console.log(req.body);
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    const refreshToken = jwt.sign(user.username, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(user.username, user.id);

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
    const isAdmin = true;

    return res.status(200).json({
        state: true,
        message: "your are logged in!",
        data: {
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            permissions,
            roles,
            isAdmin,
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
async function handleLogin(req, res, next) {
    await passport.authenticate("local", {
        successRedirect: "panel/dashboard",
        failureRedirect: "login",
        failureFlash: true
    })(req, res, next);
}

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
    const user = await User.findOne({email: email});
    if (!user) {
        return res.render("auth/forget-password", {
            pageTitle: "",
            path: "",
        })
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    //sendEmail(user.first_name, user.last_name, user.email, 'فراموشی رمز عبور', )
}

async function resetPassword(req, res) {
    const p = req.body;
    res.send(p);
}

module.exports = AuthController;
