const ArticleCategory = require('../../Models/ArticleCategoryModel');
const Employee = require('../../Models/EmployeeModel');
const ArticleCategoryRequest = require('../../../app/Requests/ArticleCategoryRequest');
const Validator = require('fastest-validator');
const v = new Validator();
const Handler = require('../../../app/Exceptions/Handler');
const sharp = require('sharp');
const Formidable = require('formidable');
const uuid = require('uuid').v4;
const {Op} = require("sequelize");

const ArticleCategoryController = {
    index,
    store,
    update,
    destroy,
    search,
};

async function index(req, res) {
    const page = +req.query.page || 1;
    const perPage = 1;

    if (req.query.all === 'all') {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: await ArticleCategory.findAll({
                    include: {
                        model: Employee,
                        attributes: ['id', 'username'],
                    },
                    order: [
                        ['id', 'ASC']
                    ]
                }),
            },
            errors: null
        });
    } else {
        const numberOfArticleCategories = await ArticleCategory.findAndCountAll();
        const articleCategories = await ArticleCategory.findAll({
            include: {
                model: Employee,
                attributes: ['id', 'username'],
            },
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
                data: articleCategories,
                current_page: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfArticleCategories.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfArticleCategories.count / perPage),
                total: Math.ceil(numberOfArticleCategories.count / perPage),
            },
            errors: null
        });
    }
}

async function store(req, res) {
    let form = new Formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const newEmp = {
            employeeId: fields.employeeId,
            name: fields.name,
            description: fields.description,
            state: fields.state,
        };

        const validate = v.validate(newEmp, ArticleCategoryRequest.create());
        let errorArr = [];

        if (validate === true) {

            let oldPath = files.image.path;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
            let newPath = `C:/nodejs_projects/nodejs_project_10/public/storage/article-categories/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(() => {
                    ArticleCategory.create({
                        employeeId: fields.employeeId,
                        name: fields.name,
                        description: fields.description,
                        state: fields.state,
                        image: newPath,
                    })
                        .then(async () => {
                            return res.status(201).json({
                                state: true,
                                message: "Success!",
                                data: await ArticleCategory.findAll(),
                                errors: null
                            });
                        });
                })
                .catch(async () => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: await ArticleCategory.findAll(),
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

        const validate = v.validate(newEmp, ArticleCategoryRequest.update());
        let errorArr = [];

        if (validate === true) {

            let oldPath = files.image.path;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
            let newPath = `C:/nodejs_projects/nodejs_project_10/public/storage/article-categories/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(async () => {
                    await ArticleCategory.update(newEmp, {
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(async () => {
                            return res.status(200).json({
                                state: true,
                                message: "Success!",
                                data: await ArticleCategory.findAll(),
                                errors: null
                            });
                        });
                })
                .catch(async () => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: await ArticleCategory.findAll(),
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
        await ArticleCategory.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({
            state: false,
            message: "Success!",
            data: await ArticleCategory.findAll(),
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
        const numberOfArticleCategories = await ArticleCategory.findAndCountAll({
            where: {
                username: {
                    [Op.like]: '%' + search + '%'
                }
            }
        });

        const articleCategorySearch = await ArticleCategory.findAll({
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
                data: articleCategorySearch,
                currentPage: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfArticleCategories.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfArticleCategories.count / perPage),
                total: Math.ceil(numberOfArticleCategories.count / perPage),
            },
            errors: null
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = ArticleCategoryController;
