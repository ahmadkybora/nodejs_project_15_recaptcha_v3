const Employee = require('../../Models/EmployeeModel');
const employeeRequest = require('../../../app/Requests/employeeRequest');
const Validator = require('fastest-validator');
const v = new Validator();
const Handler = require('../../../app/Exceptions/Handler');
const sharp = require('sharp');
const Formidable = require('formidable');
const uuid = require('uuid').v4;
const captchapng = require('captchapng');
const bcrypt = require('bcrypt');
//const sequelize = require("sequelize");
//const Op = sequelize.Op;
const {Op} = require("sequelize");

const EmployeeController = {
    getCaptcha,
    index,
    show,
    create,
    store,
    update,
    destroy,
    search,
};

async function getCaptcha(req, res) {
    let cp = Math.random() * 9000 + 1000;
    let p = new captchapng(80, 30, cp);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);

    let img = p.getBase64();
    let imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

async function index(req, res) {
    const page = +req.query.page || 1;
    const perPage = 1;

    if (req.query.all === 'all') {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: await Employee.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                }),
            },
            errors: null
        });
    } else {
        const numberOfEmployees = await Employee.findAndCountAll();
        const employees = await Employee.findAll({
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
                data: employees,
                current_page: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfEmployees.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfEmployees.count / perPage),
                total: Math.ceil(numberOfEmployees.count / perPage),
            },
            errors: null
        });
    }
}

async function show(req, res) {
    try {
        const employee = await Employee.findByPk(req.params.id);
        res.render("panel/employees/show", {
            employee: employee
        })
    } catch (err) {
        Handler.Error_404(req, res);
    }
}

async function create(req, res) {
    await res.render('panel/employees/create', {
        title: 'Register'
    });
}

async function store(req, res) {
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
            state: fields.state,
        };

        const validate = v.validate(newEmp, employeeRequest.create());
        let errorArr = [];

        if (validate === true) {

            if (newEmp.password !== newEmp.confirmation_password)
                return res.status(422).json({
                    state: false,
                    message: "your password does not match!",
                    data: await Employee.findAll(),
                    errors: null
                });

            let oldPath = files.image.path;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
            let newPath = `C:/nodejs_projects/nodejs_project_10/public/storage/employees/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(() => {
                    Employee.create({
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
                                data: await Employee.findAll(),
                                errors: null
                            });
                        });
                })
                .catch(async () => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: await Employee.findAll(),
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
            state: fields.state,
        };

        const validate = v.validate(newEmp, employeeRequest.update());
        let errorArr = [];

        if (validate === true) {

            let oldPath = files.image.path;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
            let newPath = `C:/nodejs_projects/nodejs_project_10/public/storage/employees/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(async () => {
                    await Employee.update(newEmp, {
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(async () => {
                            return res.status(200).json({
                                state: true,
                                message: "Success!",
                                data: await Employee.findAll(),
                                errors: null
                            });
                        });
                })
                .catch(async () => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: await Employee.findAll(),
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
        await Employee.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({
            state: false,
            message: "Success!",
            data: await Employee.findAll(),
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
        const numberOfEmployees = await Employee.findAndCountAll({
            where: {
                username: {
                    [Op.like]: '%' + search + '%'
                }
            }
        });

        const employeeSearch = await Employee.findAll({
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
                data: employeeSearch,
                currentPage: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfEmployees.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfEmployees.count / perPage),
                total: Math.ceil(numberOfEmployees.count / perPage),
            },
            errors: null
        });

        /*const employeeSearch = await Employee.findAll({
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
        });*/

        /*const employeeSearch = await Employee.findAll({
            where: {
                username: {
                    [Op.like]: '%' + search + '%'
                }
            },
        });*/

        /*return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: numberOfEmployees,
                currentPage: page,
                nextPage: page + 1,
                previousPage: page - 1,
                hasNextPage: perPage * (page < numberOfEmployees.count),
                hasPreviousPage: page > 1,
                lastPage: Math.ceil(numberOfEmployees.count / perPage),
            },
            data2: {
                data: numberOfEmployees,
                currentPage: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfEmployees.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: '',
                total: Math.ceil(numberOfEmployees.count / perPage),
            },
            /!*per_page
            last_page
            from
            to
            currentPage
            total*!/
            errors: null
        });*/
    } catch (err) {
        console.log(err)
    }
}

module.exports = EmployeeController;
