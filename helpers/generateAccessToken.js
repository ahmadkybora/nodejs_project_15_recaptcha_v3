const jwt = require('jsonwebtoken');

function generateAccessToken(username, id) {
    return jwt.sign({
            username,
            id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '150000s'});

}

module.exports = generateAccessToken;
