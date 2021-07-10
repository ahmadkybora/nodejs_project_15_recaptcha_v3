const User = require('../../Models/UserModel');
const PermissionUser = require('../../Models/PermissionUserModel');
const RoleUser = require('../../Models/RoleUserModel');
const Permission = require('../../Models/PermissionModel');
const Role = require('../../Models/RoleModel');
const userRequest = require('../../../app/Requests/userRequest');
const Validator = require('fastest-validator');
const v = new Validator();
const Handler = require('../../../app/Exceptions/Handler');
const sharp = require('sharp');
const Formidable = require('formidable');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const {Op} = require("sequelize");

const UserController = {
    index,
    store,
    update,
    destroy,
    search
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*|Json|Promise<any>>}
 */
async function index(req, res) {
    const page = +req.query.page || 1;
    const perPage = 10;

    if (req.query.all === 'all') {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: await User.findAll({
                    order: [
                        ['id', 'DESC']
                    ]
                }),
            },
            errors: null
        });
    } else {
        const numberOfUsers = await User.findAndCountAll();
        const users = await User.findAll({
            offset: ((page - 1) * perPage),
            limit: perPage,
            include: [
                {
                    model: PermissionUser,
                    attributes: ['userId', 'permissionId'],
                    include: [
                        {
                            model: Permission,
                            attributes: ['id', 'name'],
                        }
                    ]
                },
                {
                    model: RoleUser,
                    attributes: ['userId', 'roleId'],
                    include: [
                        {
                            model: Role,
                            attributes: ['id', 'name'],
                        }
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
                data: users,
                current_page: page,
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
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function store(req, res) {
    let form = new Formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const newUsr = {
            first_name: fields.first_name,
            last_name: fields.last_name,
            username: fields.username,
            email: fields.email,
            mobile: fields.mobile,
            home_phone: fields.home_phone,
            zip_code: fields.zip_code,
            password: fields.password,
            confirmation_password: fields.confirmation_password,
            home_address: fields.home_address,
            work_address: fields.work_address,
            state: fields.state,
        };

        const validate = v.validate(newUsr, userRequest.create());
        let errorArr = [];

        if (validate === true) {

            if (newUsr.password !== newUsr.confirmation_password)
                return res.status(422).json({
                    state: false,
                    message: "your password does not match!",
                    data: await User.findAll(),
                    errors: null
                });

            let oldPath = files.image.path;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
            let newPath = `C:/nodejs_projects/nodejs_project_13_ACL/public/storage/users/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(async () => {
                    const newUser = await User.create({
                        first_name: fields.first_name,
                        last_name: fields.last_name,
                        username: fields.username,
                        email: fields.email,
                        mobile: fields.mobile,
                        home_phone: fields.home_phone,
                        zip_code: fields.zip_code,
                        password: bcrypt.hashSync(fields.password, 10),
                        home_address: fields.home_address,
                        work_address: fields.work_address,
                        state: fields.state,
                        image: newPath,
                    });

                    if (newUser) {
                        let userId = await User.findOne({
                            where: {
                                username: fields.username
                            }
                        });
                        if (userId) {

                            if (fields.permission !== undefined && fields.permission !== null) {
                                let permissions = fields.permission.split(',');
                                for (let i = 0; i < permissions.length; i++) {
                                    await PermissionUser.create({
                                        userId: userId.id,
                                        permissionId: permissions[i]
                                    })
                                        .then((result) => {
                                            if (result) {
                                                console.log(result);
                                            }
                                        })
                                        .catch(function (err) {
                                            console.log(err);
                                        });
                                }
                            }
                            if (fields.role !== undefined && fields.role !== null) {
                                let roles = fields.role.split(',');
                                for (let i = 0; i < roles.length; i++) {
                                    await RoleUser.create({
                                        userId: userId.id,
                                        roleId: roles[i]
                                    })
                                        .then((result) => {
                                            if (result) {
                                                console.log(result);
                                            }
                                        })
                                        .catch(function (err) {
                                            console.log(err);
                                        });
                                }
                            }
                        }
                        return res.status(201).json({
                            state: true,
                            message: "Success!",
                            data: await User.findAll(),
                            errors: null
                        });
                    }
                })
                .catch(() => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: User.findAll(),
                        errors: null
                    });
                });
        } else {
            validate.forEach((err) => {
                errorArr.push(err.message);
            });

            return res.status(422).json({
                state: false,
                message: "failed!",
                data: null,
                errors: errorArr
            });
        }
    });
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function update(req, res) {
    let form = new Formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const newUsr = {
            first_name: fields.first_name,
            last_name: fields.last_name,
            username: fields.username,
            email: fields.email,
            mobile: fields.mobile,
            home_phone: fields.home_phone,
            zip_code: fields.zip_code,
            password: fields.password,
            confirmation_password: fields.confirmation_password,
            home_address: fields.home_address,
            work_address: fields.work_address,
            state: fields.state,
        };

        const validate = v.validate(newUsr, userRequest.update());
        let errorArr = [];

        if (validate === true) {

            if (newUsr.password !== newUsr.confirmation_password)
                return res.status(422).json({
                    state: false,
                    message: "your password does not match!",
                    data: await User.findAll(),
                    errors: null
                });

            let oldPath = files.image.path;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
            let newPath = `C:/nodejs_projects/nodejs_project_13_ACL/public/storage/users/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(async () => {
                    const newUser = await User.update({
                        first_name: fields.first_name,
                        last_name: fields.last_name,
                        username: fields.username,
                        email: fields.email,
                        mobile: fields.mobile,
                        home_phone: fields.home_phone,
                        zip_code: fields.zip_code,
                        password: bcrypt.hashSync(fields.password, 10),
                        home_address: fields.home_address,
                        work_address: fields.work_address,
                        state: fields.state,
                        image: newPath,
                    });

                    if (newUser) {
                        let userId = await User.findOne({
                            where: {
                                username: fields.username
                            }
                        });
                        if (userId) {

                            if (fields.permission !== undefined && fields.permission !== null) {
                                let permissions = fields.permission.split(',');
                                for (let i = 0; i < permissions.length; i++) {
                                    await PermissionUser.update({
                                        userId: userId.id,
                                        permissionId: permissions[i]
                                    })
                                        .then((result) => {
                                            if (result) {
                                                console.log(result);
                                            }
                                        })
                                        .catch(function (err) {
                                            console.log(err);
                                        });
                                }
                            }
                            if (fields.role !== undefined && fields.role !== null) {
                                let roles = fields.role.split(',');
                                for (let i = 0; i < roles.length; i++) {
                                    await RoleUser.update({
                                        userId: userId.id,
                                        roleId: roles[i]
                                    })
                                        .then((result) => {
                                            if (result) {
                                                console.log(result);
                                            }
                                        })
                                        .catch(function (err) {
                                            console.log(err);
                                        });
                                }
                            }
                        }
                        return res.status(201).json({
                            state: true,
                            message: "Success!",
                            data: await User.findAll(),
                            errors: null
                        });
                    }
                })
                .catch(() => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: User.findAll(),
                        errors: null
                    });
                });
        } else {
            validate.forEach((err) => {
                errorArr.push(err.message);
            });

            return res.status(422).json({
                state: false,
                message: "failed!",
                data: null,
                errors: errorArr
            });
        }
    });
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
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

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*|Json|Promise<any>>}
 */
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

module.exports = UserController;
