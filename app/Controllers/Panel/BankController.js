const Bank = require('../../Models/BankModel');
const BankRequest = require('../../../app/Requests/BankRequest');
const Validator = require('fastest-validator');
const v = new Validator();
const Handler = require('../../../app/Exceptions/Handler');
const sharp = require('sharp');
const Formidable = require('formidable');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');
const {Op} = require("sequelize");

const BankController = {
    index,
    store,
    update,
    destroy,
    search
};

async function index(req, res) {
    const page = +req.query.page || 1;
    const perPage = 1;

    if (req.query.all === 'all') {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: await Bank.findAll({
                    order: [
                        ['id', 'DESC']
                    ]
                }),
            },
            errors: null
        });
    } else {
        const numberOfUsers = await Bank.findAndCountAll();
        const banks = await Bank.findAll({
            offset: ((page - 1) * perPage),
            limit: perPage,
            order: [
                ['id', 'DESC']
            ]
        });

        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: banks,
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

async function show(req, res) {
    /*EmployeeDB.findOne({
        _id: req.params.id
    }).then(employee => {
        res.send(employee);
    })*/

    try {
        const user = await User.findByPk(req.params.id);
        res.render("panel/users/show", {
            state: true,
            message: "success",
            user: user,
        });

    } catch (err) {
        Handler.Error_404(req, res);
    }

    /*
        await User.findByPk(req.params.id)
            .then(user => {
                res.json({
                    state: true,
                    message: "success",
                    data: user,
                })
            }).catch(err => {
                console.log(err)
            });
    */

}

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
            let newPath = `C:/nodejs_projects/nodejs_project_10/public/storage/users/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(() => {
                    User.create({
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
                    })
                        .then(async () => {
                            return res.status(201).json({
                                state: true,
                                message: "Success!",
                                data: await User.findAll(),
                                errors: null
                            });
                        });
                })
                .catch(async () => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: await User.findAll(),
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

async function edit(req, res) {
    await User.findByPk(req.params.id)
        .then((user) => {
            res.render('panel/users/edit', {
                user: user
            });
        }).catch((err) => {
            console.log(err)
        });
}

async function update(req, res) {
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/panel/users')
    } catch (err) {
        console.log(err)
    }
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

module.exports = BankController;
