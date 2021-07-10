const Cart = require('../Models/CartModel');
const Role = require('../Models/RoleModel');
const RoleUser = require('../Models/RoleUserModel');
const Permission = require('../Models/PermissionModel');
const PermissionUser = require('../Models/PermissionUserModel');

const UserPolicy = {
    all,
    view,
    create,
    update,
    destroy,
};

let role = '';
let permissions = '';
let userId = '';

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|Json|Promise<any>>}
 */
async function all(req, res, next) {
    const myRole = await Role.findOne({
        where: {
            name: 'Super Admin',
        },
    });
    if (myRole) {
        role = await RoleUser.findOne({
            where: {
                userId: req.userId,
                roleId: myRole.id,
            }
        });
    }

    const myPermission = await Permission.findOne({
        where: {
            name: 'view-cart',
        },
    });
    if (myPermission) {
        permissions = await PermissionUser.findOne({
            where: {
                userId: req.userId,
                permissionId: myPermission.id,
            }
        });
    }

    userId = await Cart.findOne({
        where: {
            id: req.userId
        }
    });

    if (!role && !permissions && !userId) {
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

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|Json|Promise<any>>}
 */
async function view(req, res, next) {
    const myRole = await Role.findOne({
        where: {
            name: 'Super Admin',
        },
    });
    if (myRole) {
        role = await RoleUser.findOne({
            where: {
                userId: req.userId,
                roleId: myRole.id,
            }
        });
    }

    const myPermission = await Permission.findOne({
        where: {
            name: 'view-cart',
        },
    });
    if (myPermission) {
        permissions = await PermissionUser.findOne({
            where: {
                userId: req.userId,
                permissionId: myPermission.id,
            }
        });
    }

    userId = await Cart.findOne({
        where: {
            id: req.userId
        }
    });

    if (!role && !permissions && !userId) {
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

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|Json|Promise<any>>}
 */
async function create(req, res, next) {
    const myRole = await Role.findOne({
        where: {
            name: 'Super Admin',
        },
    });
    if (myRole) {
        role = await RoleUser.findOne({
            where: {
                userId: req.userId,
                roleId: myRole.id,
            }
        });
    }

    const myPermission = await Permission.findOne({
        where: {
            name: 'create-cart',
        },
    });
    if (myPermission) {
        permissions = await PermissionUser.findOne({
            where: {
                userId: req.userId,
                permissionId: myPermission.id,
            }
        });
    }

    userId = await Cart.findOne({
        where: {
            id: req.userId
        }
    });

    if (!role && !permissions && !userId) {
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

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|Json|Promise<any>>}
 */
async function update(req, res, next) {
    const myRole = await Role.findOne({
        where: {
            name: 'Super Admin',
        },
    });
    if (myRole) {
        role = await RoleUser.findOne({
            where: {
                userId: req.userId,
                roleId: myRole.id,
            }
        });
    }

    const myPermission = await Permission.findOne({
        where: {
            name: 'update-user',
        },
    });
    if (myPermission) {
        permissions = await PermissionUser.findOne({
            where: {
                userId: req.userId,
                permissionId: myPermission.id,
            }
        });
    }

    userId = await Cart.findOne({
        where: {
            id: req.userId
        }
    });

    if (!role && !permissions && !userId) {
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

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|Json|Promise<any>>}
 */
async function destroy(req, res, next) {
    const myRole = await Role.findOne({
        where: {
            name: 'Super Admin',
        },
    });
    if (myRole) {
        role = await RoleUser.findOne({
            where: {
                userId: req.userId,
                roleId: myRole.id,
            }
        });
    }

    const myPermission = await Permission.findOne({
        where: {
            name: 'destroy-cart',
        },
    });
    if (myPermission) {
        permissions = await PermissionUser.findOne({
            where: {
                userId: req.userId,
                permissionId: myPermission.id,
            }
        });
    }

    userId = await Cart.findOne({
        where: {
            id: req.userId
        }
    });

    if (!role && !permissions && !userId) {
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
