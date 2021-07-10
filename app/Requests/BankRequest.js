const Bank = require('../../app/Models/BankModel');
const Validator = require('fastest-validator');
const v = new Validator();
const Formidable = require('formidable');

const BrandRequest = {
    create,
    update,
};

async function create() {
    const BankRequest = {
        account_number: {
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
        title: {
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
}

async function update(req, res, next) {
    const BankRequest = {
        account_number: {
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
        title: {
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
}

module.exports = BrandRequest;
