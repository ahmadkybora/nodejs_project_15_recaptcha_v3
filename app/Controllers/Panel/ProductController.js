const Product = require('../../Models/ProductModel');
const ProductCategory = require('../../Models/ProductCategoryModel');
const ProductRequest = require('../../../app/Requests/ProductRequest');
const Validator = require('fastest-validator');
const v = new Validator();
const Handler = require('../../../app/Exceptions/Handler');
const sharp = require('sharp');
const Formidable = require('formidable');
const uuid = require('uuid').v4;

const ProductController = {
    index,
    show,
    store,
    edit,
    update,
    destroy,
};

async function index(req, res) {
    const page = +req.query.page || 1;
    const perPage = 1;

    if (req.query === 'all') {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: await Product.findAll({
                    include: {
                        model: ProductCategory,
                        attributes: ['id', 'name'],
                    }
                })
            },
            errors: null
        });
    } else {
        const numberOfProduct = await Product.findAndCountAll();
        const products = await Product.findAll({
            include: {
                model: ProductCategory,
                attributes: ['id', 'name'],
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
                data: products,
                current_page: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfProduct.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfProduct.count / perPage),
                total: Math.ceil(numberOfProduct.count / perPage),
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
            name: fields.name,
            description: fields.description,
            price: fields.price,
            state: fields.state,
            image: files.image,
        };

        const validate = v.validate(newEmp, ProductRequest.create());
        let errorArr = [];

        if (validate === true) {

            let oldPath = files.image.path;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
            let newPath = `C:/nodejs_projects/nodejs_project_10/public/storage/products/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(() => {
                    Product.create({
                        categoryId: fields.categoryId,
                        name: fields.name,
                        description: fields.description,
                        price: fields.price,
                        state: fields.state,
                        image: newPath,
                    })
                        .then(async () => {
                            return res.status(201).json({
                                state: true,
                                message: "Success!",
                                data: await Product.findAll(),
                                errors: null
                            });
                        });
                })
                .catch(async () => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: await Product.findAll(),
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

async function show(req, res) {
}

async function edit(req, res) {
}

async function update(req, res) {
}

async function destroy(req, res) {
}

module.exports = ProductController;
