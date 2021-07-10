const Transaction = require('../../Models/TransactionModel');
const User = require('../../Models/UserModel');
const Bank = require('../../Models/BankModel');
const Employee = require('../../Models/EmployeeModel');
const TransactionRequest = require('../../../app/Requests/TransactionRequest');
const Validator = require('fastest-validator');
const v = new Validator();
const sharp = require('sharp');
const Formidable = require('formidable');
const uuid = require('uuid').v4;
const jwt = require('jsonwebtoken');

const MyTransactionController = {
    index,
    store,
    update,
    destroy,
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
                data: await Transaction.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                }),
            },
            errors: null
        });
    } else {
        const numberOfTransactions = await Transaction.findAndCountAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: Bank,
                    attributes: ['id', 'title'],
                }
            ],
        });
        const transactions = await Transaction.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: Bank,
                    attributes: ['id', 'title'],
                },
                {
                    model: User,
                    attributes: ['id', 'username'],
                }
            ],
            offset: ((page - 1) * perPage),
            limit: perPage,
            order: [
                ['createdAt', 'DESC']
            ]
        });
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: transactions,
                current_page: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfTransactions.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfTransactions.count / perPage),
                total: Math.ceil(numberOfTransactions.count / perPage),
            },
            errors: null
        });
    }
}

async function store(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let user = jwt.decode(token);
    const myUser = await User.findOne({
        where: {
            id: user.id
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

    let form = new Formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const newTra = {
            transaction_code: fields.transaction_code,
            amount: fields.amount,
            bankId: fields.bankId,
            userId: user.id,
        };

        const validate = v.validate(newTra, TransactionRequest.create());
        let errorArr = [];

        if (validate === true) {

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
                    Transaction.create({
                        transaction_code: fields.transaction_code,
                        amount: fields.amount,
                        bankId: fields.bankId,
                        userId: user.id,
                        image: newPath,
                    })
                        .then(() => {
                            const transaction = Transaction.findAll({
                                where: {
                                    userId: user.id
                                },
                                include: [
                                    {
                                        model: User,
                                    },
                                    {
                                        model: Bank,
                                    }
                                ]
                            });
                            return res.status(201).json({
                                state: true,
                                message: "Success!",
                                data: transaction,
                                errors: null
                            });
                        });
                })
                .catch(() => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: null,
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

async function update(req, res) {
    let form = new Formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const newEmp = {
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
        };

        const validate = v.validate(newEmp, userRequest.update());
        let errorArr = [];

        if (validate === true) {

            let oldPath = files.image.path;
            console.log(files.image.path);
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
                .then(async () => {
                    await User.update(newEmp, {
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(async () => {
                            return res.status(200).json({
                                state: true,
                                message: "Success!",
                                data: await User.findOne({where: {id: req.params.id}}),
                                errors: null
                            });
                        });
                })
                .catch(async () => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: await User.findOne({where: {id: req.params.id}}),
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

async function destroy(req, res) {
    try {
        await Article.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({
            state: false,
            message: "Success!",
            data: await Article.findAll(),
            errors: null
        });
    } catch (err) {
        console.log(err)
    }
}

async function search(req, res) {
    const search = req.body.full_text_search;
    const page = +req.query.page || 1;
    const perPage = 2;

    try {
        const numberOfArticles = await Article.findAndCountAll({
            where: {
                username: {
                    [Op.like]: '%' + search + '%'
                }
            }
        });

        const articleSearch = await Article.findAll({
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
                data: articleSearch,
                currentPage: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfArticles.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfArticles.count / perPage),
                total: Math.ceil(numberOfArticles.count / perPage),
            },
            errors: null
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = MyTransactionController;
