const User = require('../app/Models/UserModel');

async function isAdmin(req, res, next) {
    const isAdmin = await User.findOne({
        where: {
            username: req.body.username,
        }
    });
    if (isAdmin.isAdmin === false) {
        return res.status(401).json({
            state: true,
            message: "You are not admin!",
            data: null,
            errors: null
        });
    }
    next();
}

module.exports = isAdmin;
