const Cart = require('../../Models/CartModel');
const Product = require('../../Models/ProductModel');
const CartRequest = require('../../../app/Requests/CartRequest');
const Validator = require('fastest-validator');
const v = new Validator();
const sharp = require('sharp');
const Formidable = require('formidable');
const uuid = require('uuid').v4;
const jwt = require('jsonwebtoken');

const MyCartController = {
    myCart,
    addToCart,
    updateCart,
    removeFromCart,
    deleteCart,
    myCartHistory,
    search,
};

async function myCart(req, res) {
    const myCart = await Cart.findAll({
        where: {
            userId: 1,
        },
        include: [
            {
                model: Product,
                attributes: ['id', 'name']
            }
        ]
    });

    if (myCart) {
        return res
            .status(200)
            .json({
                state: true,
                message: "Success!",
                data: {
                    data: myCart
                },
                errors: null
            });
    }
}

async function addToCart(req, res) {
}

async function updateCart(req, res) {
}

async function removeFromCart(req, res) {
}

async function deleteCart(req, res) {
}

async function myCartHistory(req, res) {
}

async function search(req, res) {
}

module.exports = MyCartController;
