const Brand = require('../../app/Models/BrandModel');
const Validator = require('fastest-validator');
const v = new Validator();
const Formidable = require('formidable');

const ProductCategoryRequest = {
    create,
    update,
};

async function create() {
    const ProductCategoryRequest = {
        brandId: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        employeeId: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        name: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "نام الزامی است",
                stringMin: "نام نباید کمتر از 2 کلمه باشد",
                stringMax: "نام نباید بیشتر از 255 کلمه باشد",
            }
        },
        description: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "توضیحات الزامی است",
                stringMin: "توضیحات نباید کمتر از 2 کلمه باشد",
                stringMax: "توضیحات نباید بیشتر از 255 کلمه باشد",
            }
        },
        state: {
            type: "string",
            enum: ["ACTIVE", "PENDING"],
            messages: {
                required: "وضعیت الزامی است",
            }
        },
    };
}

async function update(req, res, next) {
    const ProductCategoryRequest = {
        name: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "نام الزامی است",
                stringMin: "نام نباید کمتر از 2 کلمه باشد",
                stringMax: "نام نباید بیشتر از 255 کلمه باشد",
            }
        },
        EmployeeId: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        description: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "توضیحات الزامی است",
                stringMin: "توضیحات نباید کمتر از 2 کلمه باشد",
                stringMax: "توضیحات نباید بیشتر از 255 کلمه باشد",
            }
        },
        state: {
            type: "number",
            trim: true,
            messages: {
                required: "وضعیت الزامی است",
            }
        },
    };
    const validate = v.validate(req.body, BrandRequest);
    let errorArr = [];

    if (validate === true) {
        const name = await Brand.findOne({
            where: {
                name: req.body.name
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
            next();
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
}

module.exports = ProductCategoryRequest;
