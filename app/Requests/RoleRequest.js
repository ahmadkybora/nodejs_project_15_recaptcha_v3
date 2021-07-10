const Validator = require('fastest-validator');
const v = new Validator();

const RoleRequest = {
    create,
    update,
};

async function create(req, res, next) {
    const RoleRequest = {
        role: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "نقش الزامی است",
                stringMin: "نقش نباید کمتر از 2 کلمه باشد",
                stringMax: "نقش نباید بیشتر از 255 کلمه باشد",
            }
        },
        permission: {
            type: "array",
            items: "number",
            /*trim: true,
            min: 2,
            max: 255,*/
            messages: {
                required: "مجوز الزامی است",
                /*stringMin: "مجوز نباید کمتر از 2 کلمه باشد",
                stringMax: "مجوز نباید بیشتر از 255 کلمه باشد",*/
            }
        },
    };

    const newRol = {
        role: req.body.role,
        permission: req.body.permission,
    };

    const validate = v.validate(newRol, RoleRequest);
    let errorArr = [];

    if (validate !== true) {
        validate.forEach((err) => {
            errorArr.push(err.message);
        });

        return res.status(422).json({
            state: false,
            message: "failed!",
            data: null,
            errors: errorArr
        });
    }else{
        req.newRol = newRol;
        next();
    }
}

async function update() {
    const RoleRequest = {
        role: {
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
        permissions: {
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
    };
}

module.exports = RoleRequest;
