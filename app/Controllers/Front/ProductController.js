const Product = require('../../Models/Product');
const ProductCategory = require('../../Models/ProductCategory');
const productRequestValidation = require('../../../app/Requests/productRequestValidation');
const Validator = require ('fastest-validator');
const v = new Validator();
const Handler = require('../../../app/Exceptions/Handler');
const isLoggedIn = require('../../../middlewares/isLoggedIn');

const ProductController = {

    index: async (req, res) => {
        try {
            const products = await Product.findAll();
            res.render("layouts/front/home", {
                pageTitle: "view all products",
                products: products,
                isLoggedIn: isLoggedIn
            })
        } catch (err) {
            console.log(err)
        }
    },

    create: async (req, res) => {
        try {
            const categories = ProductCategory.findAll();
            await res.render("panel/products/create", {
                pageTitle: "",
                categories: categories
            })
        } catch (err) {
            console.log(err)
        }
    },

    store: async (req, res) => {
        const validate = v.validate(req.body, productRequestValidation);
        if (validate) {
            try {
                await Product.create(req.body);
                res.redirect("panel/product")
            } catch (err) {
                return Handler.Error_503();
            }
        } else {
            res.render("panel/product/create", {
                pageTitle: 'product create',
                //path: "/register",
                errors: validate,
            });
        }
    },
    show: (req, res) => {
    },
    edit: (req, res) => {
    },
    update: (req, res) => {
    },
    destroy: (req, res) => {
    },
};

module.exports = ProductController;
