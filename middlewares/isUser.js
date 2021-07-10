const jwt = require('jsonwebtoken');
const User = require('../app/Models/UserModel');

async function isUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let user = jwt.decode(token);

    const isAdmin = await User.findOne({
        where: {
            id: user.id,
        }
    });
    if (!isAdmin) {
        return res.status(401).json({
            state: true,
            message: "Forbidden!",
            data: null,
            errors: null
        });
    }
    next();
}

module.exports = isUser;
