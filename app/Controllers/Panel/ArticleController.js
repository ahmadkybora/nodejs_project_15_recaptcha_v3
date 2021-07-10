const Article = require('../../Models/ArticleModel');
const ArticleCategory = require('../../Models/ArticleCategoryModel');
const Employee = require('../../Models/EmployeeModel');
const ArticleRequest = require('../../../app/Requests/ArticleRequest');
const Validator = require('fastest-validator');
const v = new Validator();
const Handler = require('../../../app/Exceptions/Handler');
const sharp = require('sharp');
const Formidable = require('formidable');
const uuid = require('uuid').v4;
const {Op} = require("sequelize");

const ArticleController = {
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
                data: await Article.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                }),
            },
            errors: null
        });
    } else {
        const numberOfArticles = await Article.findAndCountAll();
        const articles = await Article.findAll({
            include: [
                {
                    model: Employee,
                    attributes: ['id', 'username'],
                }, {
                    model: ArticleCategory,
                    attributes: ['id', 'name'],
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
                data: articles,
                current_page: page,
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
    }
}

async function store(req, res) {
    let form = new Formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const newEmp = {
            categoryId: fields.categoryId,
            employeeId: fields.employeeId,
            name: fields.name,
            description: fields.description,
            state: fields.state,
        };

        const validate = v.validate(newEmp, ArticleRequest.create());
        let errorArr = [];

        if (validate === true) {

            let oldPath = files.image.path;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
            let newPath = `C:/nodejs_projects/nodejs_project_10/public/storage/articles/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(() => {
                    Article.create({
                        categoryId: fields.categoryId,
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
                                data: await Article.findAll(),
                                errors: null
                            });
                        });
                })
                .catch(async () => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: await Article.findAll(),
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
            categoryId: fields.categoryId,
            employeeId: fields.employeeId,
            name: fields.name,
            description: fields.description,
            state: fields.state,
        };

        const validate = v.validate(newEmp, ArticleRequest.update());
        let errorArr = [];

        if (validate === true) {

            let oldPath = files.image.path;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
            let newPath = `C:/nodejs_projects/nodejs_project_10/public/storage/articles/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(async () => {
                    await Article.update(newEmp, {
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(async () => {
                            return res.status(200).json({
                                state: true,
                                message: "Success!",
                                data: await Article.findAll(),
                                errors: null
                            });
                        });
                })
                .catch(async () => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: await Article.findAll(),
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

module.exports = ArticleController;
