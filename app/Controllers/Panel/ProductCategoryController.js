const ProductCategory = require("../../Models/ProductCategoryModel");
const Brand = require("../../Models/BrandModel");
const Employee = require("../../Models/EmployeeModel");
const productCategoryRequest = require("../../../app/Requests/productCategoryRequest");
const Validator = require("fastest-validator");
const v = new Validator();
const sequelize = require("sequelize");
const Op = sequelize.Op;
const uuid = require('uuid').v4;
const Formidable = require('formidable');
const sharp = require('sharp');

const ProductCategoryController = {
    search,
    index,
    store,
    update,
    destroy
};

async function search(req, res) {
    const {search} = req.body;
    const page = +req.query.page || 1;
    const perPage = 1;

    try {
        const numberOfEmployees = await ProductCategory.findAndCountAll({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }
        });

        const categorySearch = await ProductCategory.findAll({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            },
            include: Brand
        }, {
            limit: perPage,
            offset: ((page - 1) * perPage)
        });

        res.render("panel/product-categories", {
            path: '/panel/product-categories/category-search',
            title: "category-Search",
            categorySearch: categorySearch,
            currentPage: page,
            nextPage: page + 1,
            previousPage: page - 1,
            hasNextPage: perPage * (page < numberOfEmployees.count),
            hasPreviousPage: page > 1,
            lastPage: Math.ceil(numberOfEmployees.count / perPage),
            search: true,
        });
    } catch (err) {
        console.log(err)
    }
}

async function index(req, res) {
    const page = +req.query.page || 1;
    const perPage = 10;

    const numberOfCategories = await ProductCategory.findAndCountAll();
    const categories = await ProductCategory.findAll({
            include: [{
                model: Brand,
                attributes: ['id', 'name'],
            }, {
                model: Employee,
                attributes: ['id', 'username'],
            }]
        }, {
            limit: perPage,
            offset: ((page - 1) * perPage)
        }
    );

    if (req.query === 'all') {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: await ProductCategory.findAll({include: Brand})
            },
            errors: null
        });
    } else {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: categories,
                current_page: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfCategories.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfCategories.count / perPage),
                total: Math.ceil(numberOfCategories.count / perPage),
            },
            errors: null
        });
    }
}

async function store(req, res) {
    let form = new Formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
            const newPc = {
                employeeId: fields.employeeId,
                brandId: fields.brandId,
                name: fields.name,
                description: fields.description,
                state: fields.state,
                image: files.image.name
            };
            const validate = v.validate(newPc, productCategoryRequest.create());
            let errorArr = [];

            if (validate === true) {
                let oldPath = files.image.path;
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
                let newPath = `C:/nodejs_projects/nodejs_project_9/public/storage/product-categories/${fileName}`;

                await sharp(oldPath)
                    .resize(125, 90)
                    .png({
                        quality: 90,
                    }).jpeg({
                        quality: 90,
                    })
                    .toFile(newPath)
                    .then(() => {
                        ProductCategory.create({
                            employeeId: fields.employeeId,
                            name: fields.name,
                            image: newPath,
                            status: fields.status,
                            brandId: fields.brandId
                        }, {
                            include: {
                                model: Brand
                            }
                        })
                            .then(async () => {
                                return res.status(200).json({
                                    state: true,
                                    message: "Success!",
                                    data: {
                                        brands: await Brand.findAll(),
                                        employees: await Employee.findAll(),
                                    },
                                    errors: null
                                });
                            });
                    })
                    .catch(async () => {
                        return res.status(200).json({
                            state: true,
                            message: "Success!",
                            data: {
                                brands: await Brand.findAll(),
                                employees: await Employee.findAll(),
                            },
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
        }
    );
}

async function update(req, res) {
    let form = new Formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (typeof files.image !== 'undefined') {
            const newPc = {
                employeeId: fields.employeeId,
                brandId: fields.brandId,
                name: fields.name,
                status: fields.status,
                image: files.image.name
            };
            const validate = await v.validate(newPc, productCategoryRequest);

            if (validate === true) {
                let oldPath = files.image.path;
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
                let newPath = `C:/nodejs_projects/nodejs_project_9/public/storage/product-categories/${fileName}`;

                await sharp(oldPath)
                    .resize(125, 90)
                    .png({
                        quality: 90,
                    }).jpeg({
                        quality: 90,
                    })
                    .toFile(newPath)
                    .then(async () => {
                        await ProductCategory.update(newPc, {
                            where: {
                                id: req.params.id
                            }
                        });
                        return res.redirect("/panel/product-categories");
                    })
                    .catch(async (err) => {
                        console.log(err);
                        res.render('panel/product-categories/edit', {
                            title: "editEmployees",
                            category: await ProductCategory.findByPk(req.params.id, {include: Brand}),
                            brands: await Brand.findAll(),
                            employees: await Employee.findAll(),
                            errors: validate,
                        });
                    });
            } else {
                res.render('panel/product-categories/edit', {
                    title: "editEmployees",
                    category: await ProductCategory.findByPk(req.params.id, {include: Brand}),
                    brands: await Brand.findAll(),
                    employees: await Employee.findAll(),
                    errors: validate,
                });
            }
        }
    });
}

async function destroy(req, res) {
    try {
        await ProductCategory.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect("/panel/product-categories");
    } catch (err) {
        console.log(err)
    }
}

module.exports = ProductCategoryController;
