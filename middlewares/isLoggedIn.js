const jwt = require('jsonwebtoken');
const Token = require('../app/Models/TokenModel');

async function isLoggedIn(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader === null) {
        return res.status(401).json({
            state: true,
            message: "unAuthorized!",
            data: null,
            errors: null
        });
    }

    const token = authHeader && authHeader.split(' ')[1];
    let user = jwt.decode(token);

    const result = await Token.findOne({
        where: {
            userId: user.id,
        }
    });

    if (!result) {
        return res.status(401).json({
            state: true,
            message: "unAuthorized!",
            data: null,
            errors: null
        });
    } else {
        jwt.verify(token, process.env.Access_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({
                    state: true,
                    message: "unAuthorized!",
                    data: null,
                    errors: null
                });
            } else {
                req.userId = user.id;
                next()
            }
        })
    }
}

module.exports = isLoggedIn;

