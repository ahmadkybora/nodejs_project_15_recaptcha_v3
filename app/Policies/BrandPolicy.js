const Brand = require('../Models/UserModel');
const Role = require('../Models/RoleModel');
const RoleUser = require('../Models/RoleUserModel');
const jwt = require('jsonwebtoken');

const UserPolicy = {
    all,
    view,
    create,
    update,
    destroy,
};

async function all(req, res, next) {
    const myBrand = await Brand.findOne({
        where: {
            userId: 1
        }
    });

    const role = await Role.findOne({
        where: {
            name: 'Super Admin'
        },
        include: [
            {
                model: RoleUser,
                attributes: ['userId', 'roleId'],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username'],
                        where: {
                            id: req.userId
                        }
                    }
                ]
            }
        ]
    });

    if (!myBrand && !role) {
        return res
            .status(403)
            .json({
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

async function view(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let user = jwt.decode(token);

    const myUser = await User.findOne({
        where: {
            id: user.id
        }
    });
    /*const role = await Role.findOne({
        where: {

        }
    })*/
    if (!myUser) {
        return res
            .status(403)
            .json({
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

async function create(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let user = jwt.decode(token);

    const myUser = await User.findOne({
        where: {
            id: user.id
        }
    });
    /*const role = await Role.findOne({
        where: {

        }
    })*/
    if (!myUser) {
        return res
            .status(403)
            .json({
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

async function update(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let user = jwt.decode(token);

    const myUser = await User.findOne({
        where: {
            id: user.id
        }
    });
    /*const role = await Role.findOne({
        where: {

        }
    })*/
    if (!myUser) {
        return res
            .status(403)
            .json({
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

async function destroy(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let user = jwt.decode(token);

    const myUser = await User.findOne({
        where: {
            id: user.id
        }
    });
    /*const role = await Role.findOne({
        where: {

        }
    })*/
    if (!myUser) {
        return res
            .status(403)
            .json({
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

module.exports = UserPolicy;
