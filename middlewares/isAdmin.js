const jwt = require('jsonwebtoken');
const Employee = require('../app/Models/EmployeeModel');

async function isAdmin(req, res, next) {
    const isAdmin = await Employee.findOne({
        where: {
            id: req.userId,
        }
    });
    if (!isAdmin) {
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
