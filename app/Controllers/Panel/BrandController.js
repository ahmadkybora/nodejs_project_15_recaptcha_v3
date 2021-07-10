const Brand = require('../../../app/Models/BrandModel');
const BrandRequest = require('../../../app/Requests/BrandRequest');
const Employee = require("../../../app/Models/EmployeeModel");
const Validator = require('fastest-validator');
const v = new Validator();
const uuid = require('uuid').v4;
const Formidable = require('formidable');
const sharp = require('sharp');
const {Op} = require("sequelize");

const BrandController = {
    index,
    create,
    store,
    show,
    edit,
    update,
    destroy,
    search
};

async function index(req, res) {
/*    const page = +req.query.page || 1;
    const perPage = 1;

    if (req.query.all === 'all') {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: await Brand.findAll({
                    include: {
                        model: Employee,
                        //attributes: ['id', 'username'],
                    }
                })
            },
            errors: null
        });
    } else {
        const numberOfBrands = await Brand.findAndCountAll();
        const brands = await Brand.findAll({
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
                data: brands,
                current_page: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfBrands.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfBrands.count / perPage),
                total: Math.ceil(numberOfBrands.count / perPage),
            },
            errors: null
        });
    }*/
}

async function create(req, res) {
    try {
        await res.render('panel/brands/create', {
            pageTitle: 'brand create',
        })
    } catch (err) {
        console.log(err)
    }
}

async function store(req, res) {
    let form = new Formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const newPc = {
            name: fields.name,
            employeeId: fields.employeeId,
            description: fields.description,
            state: fields.state,
        };

        const validate = v.validate(newPc, BrandRequest.create());
        let errorArr = [];

        if (validate === true) {
            const name = await Brand.findOne({
                where: {
                    name: newPc.name
                }
            });

            if (name) {
                errorArr.push({message: "نام برند موجود است"});
                return res.status(422).json({
                    status: false,
                    message: "failed!",
                    data: null,
                    errors: errorArr
                });
            } else {
                let oldPath = files.image.path;
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
                let newPath = `C:/nodejs_projects/nodejs_project_10/public/storage/brands/${fileName}`;
                //let newPath = `/public/storage/brands/${fileName}`;

                await sharp(oldPath)
                    .resize(125, 90)
                    .png({
                        quality: 90,
                    }).jpeg({
                        quality: 90,
                    })
                    .toFile(newPath)
                    .then(() => {
                        Brand.create({
                            name: fields.name,
                            employeeId: fields.employeeId,
                            description: fields.description,
                            state: fields.state,
                            image: newPath,
                        }, {
                            include: {
                                model: Employee
                            }
                        })
                            .then(async () => {
                                return res.status(200).json({
                                    state: true,
                                    message: "Success!",
                                    data: await Brand.findAll(),
                                    errors: null
                                });
                            })
                    })
                    .catch(() => {
                        return res.status(500).json({
                            state: false,
                            message: "Failed!",
                            data: null,
                            errors: null
                        });
                    });
            }
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
    try {
        const brand = await Brand.findByPk(req.params.id);
        res.render("panel/brands/edit", {
            pageTitle: "",
            brand: brand
        })
    } catch (err) {
        console.log(err)
    }
}

async function update(req, res) {
    try {
        await Brand.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/panel/brands')
    } catch (err) {
        console.log(err)
    }
}

async function destroy(req, res) {
    try {
        await Brand.destroy({
            where: {
                id: req.params.id
            }
        });
    } catch (err) {
        console.log(err)
    }

    res.redirect("/panel/brands");
}

async function search(req, res) {
    const search = req.body.full_text_search;
    const page = +req.query.page || 1;
    const perPage = 2;

    try {
        const numberOfBrands = await Brand.findAndCountAll({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }
        });

        const brandSearch = await Brand.findAll({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            },
            include: {
                model: Employee,
                attributes: ['id', 'username'],
            }
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
                data: brandSearch,
                currentPage: page,
                to: page + 1,
                from: page - 1,
                hasNextPage: perPage * (page < numberOfBrands.count),
                hasPreviousPage: page > 1,
                per_page: perPage,
                last_page: Math.ceil(numberOfBrands.count / perPage),
                total: Math.ceil(numberOfBrands.count / perPage),
            },
            errors: null
        });

    } catch (err) {
        console.log(err)
    }
}

module.exports = BrandController;
