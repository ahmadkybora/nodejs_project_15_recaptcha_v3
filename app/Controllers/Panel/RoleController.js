const Role = require('../../Models/RoleModel');
const Permission = require('../../Models/PermissionModel');
const PermissionRole = require('../../Models/PermissionRoleModel');
const {Op} = require("sequelize");
const AccessControl = require('accesscontrol');

const RoleController = {
    index,
    store,
    update,
    destroy,
    permissions,
    roles,
    search
};

async function index(req, res) {
    const page = +req.query.page || 1;
    const perPage = 10;

    if (req.query.all === 'all') {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: await Role.findAll({
                    order: [
                        ['id', 'DESC']
                    ]
                }),
            },
            errors: null
        });
    } else {
        const numberOfRoles = await Role.findAndCountAll();
        const roles = await Role.findAll({
            offset: ((page - 1) * perPage),
            limit: perPage,
            include: [
                {
                    model: PermissionRole,
                    attributes: ['roleId', 'permissionId'],
                    include: [
                        {
                            model: Permission,
                            attributes: ['id', 'name'],
                        },
                    ]
                }
            ],
            order: [
                ['id', 'DESC']
            ]
        });

        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: roles,
                current_page: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfRoles.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfRoles.count / perPage),
                total: Math.ceil(numberOfRoles.count / perPage),
            },
            errors: null
        });
    }
}

async function store(req, res) {
    let role = req.newRol.role;
    let permissions = req.newRol.permission;

    let newRole = await Role.create({
        name: role
    });

    if (newRole) {
        let roleId = await Role.findOne({
            where: {
                name: role
            }
        });

        if (roleId) {
            for (let i = 0; i < permissions.length; i++) {
                await PermissionRole.create({
                    roleId: roleId.id,
                    permissionId: permissions[i]
                }).then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.log(err)
                })
            }
            return res.status(201).json({
                state: true,
                message: "Success!",
                data: await Role.findAll(),
                errors: null
            });
        }
        return res.status(200).json({
            state: false,
            message: "Failed!",
            data: await Role.findAll(),
            errors: null
        });
    }
    return res.status(200).json({
        state: false,
        message: "Failed!",
        data: await Role.findAll(),
        errors: null
    });
}

async function update(req, res) {
    let role = req.newRol.role;
    let permissions = req.newRol.permission;

    let newRole = await Role.update({
        name: role
    });

    if (newRole) {
        let roleId = await Role.findOne({
            where: {
                name: role
            }
        });

        if (roleId) {
            for (let i = 0; i < permissions.length; i++) {
                await PermissionRole.update({
                    roleId: roleId.id,
                    permissionId: permissions[i]
                }).then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.log(err)
                })
            }
            return res.status(201).json({
                state: true,
                message: "Success!",
                data: await Role.findAll(),
                errors: null
            });
        }
        return res.status(200).json({
            state: false,
            message: "Failed!",
            data: await Role.findAll(),
            errors: null
        });
    }
    return res.status(200).json({
        state: false,
        message: "Failed!",
        data: await Role.findAll(),
        errors: null
    });
}

async function destroy(req, res) {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/panel/users')
    } catch (err) {
        console.log(err)
    }
}

async function permissions(req, res) {
    const permissions = await Permission.findAll({
        /*include: [
            {
                model: PermissionRole,
                include: [
                    {
                        model: Role,
                    }
                ]
            }
        ]*/
    });

    return res.status(200).json({
        state: true,
        message: "Success!",
        data: {
            data: permissions,
        },
        errors: null
    });
}

async function roles(req, res) {
}

async function search(req, res) {
    const search = req.body.full_text_search;
    const page = +req.query.page || 1;
    const perPage = 2;

    try {
        const numberOfUsers = await User.findAndCountAll({
            where: {
                username: {
                    [Op.like]: '%' + search + '%'
                }
            }
        });

        const userSearch = await User.findAll({
            where: {
                username: {
                    [Op.like]: '%' + search + '%'
                }
            },
        }, {
            limit: perPage,
            offset: ((page - 1) * perPage),
            order: [
                ['id', 'ASC']
            ]
        });
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: userSearch,
                currentPage: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfUsers.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfUsers.count / perPage),
                total: Math.ceil(numberOfUsers.count / perPage),
            },
            errors: null
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = RoleController;
