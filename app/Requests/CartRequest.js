const Cart = require('../../app/Models/CartModel');
const Validator = require('fastest-validator');

const CartRequest = {
    create,
    update,
};

async function create(res, req, next) {
    const CartRequest = {
        quantity: {
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
        userId: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        productId: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        state: {
            type: "string",
            //items: "string",
            enum: ["ACTIVE", "PENDING"],
            messages: {
                required: "وضعیت الزامی است",
            }
        },
    };
    const validate = v.validate(req.body, CartRequest);
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
    } else {
        let myCart = req.body;
        next();
    }
}

async function update(req, res, next) {
    const CartRequest = {
        quantity: {
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
        userId: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        productId: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        state: {
            type: "string",
            //items: "string",
            enum: ["ACTIVE", "PENDING"],
            messages: {
                required: "وضعیت الزامی است",
            }
        },
    };
    const validate = v.validate(req.body, CartRequest);
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
    } else {
        let myCart = req.body;
        next();
    }
}

module.exports = CartRequest;
