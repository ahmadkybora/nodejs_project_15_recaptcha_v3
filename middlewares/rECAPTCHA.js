const fetch = require("node-fetch");
const passport = require('passport');

async function rECAPTCHA(req, res, next) {
    if (req.body["google_rECAPTCHA"] === null &&
        req.body["google_rECAPTCHA"] === undefined &&
        req.body["google_rECAPTCHA"] === "") {
        return res
            .status(401)
            .json({
                state: true,
                message: "rECAPTCHA is required!",
                data: null,
                errors: null
            });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body["google_rECAPTCHA"]}&remoteip=${req.connection.remoteAddress}`;
    const response = await fetch(verifyUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
    });
    const json = await response.json();
    if (!json.success) {
        req = req.body;
        next();
        /*passport.authenticate("local", {
            failureRedirect: "/users/login",
            failureFlash: true,
        })(req, res, next);*/
    } else {
        return res
            .status(401)
            .json({
                state: true,
                message: "rECAPTCHA is not invalid!",
                data: null,
                errors: null
            });
    }
}

module.exports = rECAPTCHA;
