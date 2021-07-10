const jwt = require('jsonwebtoken');
const Transaction = require('../app/Models/TransactionModel');

async function isUser(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let user = jwt.decode(token);

    const myUser = await Transaction.findOne({
        where: {
            userId: user.id
        }
    });

    if (!myUser) {
        return res.status(401).json({
            state: true,
            message: "Forbidden!",
            data: {
                data: null,
            },
            errors: null
        });
    }
    next();
}

module.exports = isUser;
