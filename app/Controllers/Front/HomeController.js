const Brand = require('../../Models/BrandModel');
const ProductCategory = require('../../Models/ProductCategoryModel');
const Product = require('../../Models/ProductModel');
const ArticleCategory = require('../../Models/ArticleCategoryModel');
const Article = require('../../Models/ArticleModel');
const Employee = require('../../Models/EmployeeModel');
const User = require('../../Models/UserModel');
const ProductFavoriteLike = require('../../Models/ProductFavoriteLikeModel');
const ArticleLike = require('../../Models/ArticleLikeModel');
const isLoggedIn = require('../../../middlewares/isLoggedIn');
//import captchapng from 'captchapng';
//let CAPTCHA_NUM = parseInt(Math.random() * 9000 + 1000);
//let CAPTCHA_NUM = parseInt(1);

const HomeController = {
    index,
    brands,
    productCategories,
    products,
    productLikes,
    productDisLikes,
    productFavorite,
    productUnFavorite,
    articleCategories,
    articles,
    articleLikes,
    articleDisLikes,
    getContactUs,
    postContactUs,
    getCaptcha
};

async function index(req, res) {
    try {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: await Product.findAll(),
            errors: null
        });
    } catch (err) {
        console.log(err)
    }
}

async function brands(req, res) {
    try {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                brands: await Brand.findAll({
                    where: {
                        state: "ACTIVE"
                    }
                }),
                poupular_brands: '',
            },
            errors: null
        });
    } catch (err) {
        console.log(err)
    }
}

async function productCategories(req, res) {
    try {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: await ProductCategory.findAll({
                    include: [
                        {
                            model: Employee,
                            attributes: ['id', 'username']
                        }
                    ],
                    where: {
                        state: "ACTIVE"
                    }
                })
            },
            errors: null
        });
    } catch (err) {
        console.log(err)
    }
}

async function products(req, res) {

    return res.status(200).json({
        state: true,
        message: "Success!",
        data: {
            data: await Product.findAll({
                include: [
                    {
                        model: ProductFavoriteLike,
                        attributes: [
                            'id',
                            'userId',
                            'productId'
                        ],
                        where: {
                            userId: 1
                        },
                    },
                ]
            }),
        },
        errors: null
    });
}

async function productLikes(req, res) {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (user) {

        const pl = {
            userId: user.id,
            productId: req.body.productId,
            isLike: true,
        };

        ProductFavoriteLike.findOne({
            where: {
                userId: user.id,
                productId: req.body.productId,
            }
        })
            .then(result => {
                if (result) {
                    ProductFavoriteLike.update(pl, {
                        where: {
                            userId: user.id,
                            productId: req.body.productId,
                        }
                    }).then(() => {
                        return res.status(200).json({
                            state: true,
                            message: "Success!",
                            data: null,
                            errors: null
                        });
                    });
                } else {
                    ProductFavoriteLike.create({
                        userId: user.id,
                        productId: req.body.productId,
                        isLike: true,
                    }).then(() => {
                        return res.status(200).json({
                            state: true,
                            message: "Success!",
                            data: null,
                            errors: null
                        });
                    })
                }
            }).catch(err => {
            console.log(err)
        })
    } else {
        return res.status(401).json({
            state: false,
            message: "You are not logged in!",
            data: null,
            errors: null
        });
    }
}

async function productDisLikes(req, res) {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (user) {

        const pl = {
            userId: user.id,
            productId: req.body.productId,
            isLike: false,
        };

        ProductFavoriteLike.findOne({
            where: {
                userId: user.id,
                productId: req.body.productId,
            }
        })
            .then(result => {
                if (result) {
                    ProductFavoriteLike.update(pl, {
                        where: {
                            userId: user.id,
                            productId: req.body.productId,
                        }
                    }).then(() => {
                        return res.status(200).json({
                            state: true,
                            message: "Success!",
                            data: null,
                            errors: null
                        });
                    });
                } else {
                    ProductFavoriteLike.create({
                        userId: user.id,
                        productId: req.body.productId,
                        isLike: false,
                    }).then(() => {
                        return res.status(200).json({
                            state: true,
                            message: "Success!",
                            data: null,
                            errors: null
                        });
                    })
                }
            }).catch(err => {
            console.log(err)
        })
    } else {
        return res.status(401).json({
            state: false,
            message: "You are not logged in!",
            data: null,
            errors: null
        });
    }
}

async function productFavorite(req, res) {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (user) {

        const pl = {
            userId: user.id,
            productId: req.body.productId,
            isFavorite: true,
        };

        ProductFavoriteLike.findOne({
            where: {
                userId: user.id,
                productId: req.body.productId,
            }
        })
            .then(result => {
                if (result) {
                    ProductFavoriteLike.update(pl, {
                        where: {
                            userId: user.id,
                            productId: req.body.productId,
                        }
                    }).then(() => {
                        return res.status(200).json({
                            state: true,
                            message: "Success!",
                            data: null,
                            errors: null
                        });
                    });
                } else {
                    ProductFavoriteLike.create({
                        userId: user.id,
                        productId: req.body.productId,
                        isFavorite: true,
                    }).then(() => {
                        return res.status(200).json({
                            state: true,
                            message: "Success!",
                            data: null,
                            errors: null
                        });
                    })
                }
            }).catch(err => {
            console.log(err)
        })
    } else {
        return res.status(401).json({
            state: false,
            message: "You are not logged in!",
            data: null,
            errors: null
        });
    }
}

async function productUnFavorite(req, res) {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (user) {

        const pl = {
            userId: user.id,
            productId: req.body.productId,
            isFavorite: false,
        };

        ProductFavoriteLike.findOne({
            where: {
                userId: user.id,
                productId: req.body.productId,
            }
        })
            .then(result => {
                if (result) {
                    ProductFavoriteLike.update(pl, {
                        where: {
                            userId: user.id,
                            productId: req.body.productId,
                        }
                    })
                        .then(() => {
                            return res.status(200).json({
                                state: true,
                                message: "Success!",
                                data: null,
                                errors: null
                            });
                        });
                } else {
                    ProductFavoriteLike.create({
                        userId: user.id,
                        productId: req.body.productId,
                        isFavorite: false,
                    })
                        .then(() => {
                            return res.status(200).json({
                                state: true,
                                message: "Success!",
                                data: null,
                                errors: null
                            });
                        })
                }
            }).catch(err => {
            console.log(err)
        })
    } else {
        return res.status(401).json({
            state: false,
            message: "You are not logged in!",
            data: null,
            errors: null
        });
    }
}

async function articleCategories(req, res) {
    try {
        return res.status(200).json({
                state: true,
                message: "Success!",
                data: {
                    data: await ArticleCategory.findAll({
                        where: {
                            state: "ACTIVE"
                        }
                    })
                },
                errors: null
            }
        );
    } catch
        (err) {
        console.log(err)
    }
}

async function articles(req, res) {
    try {
        return res.status(200).json({
            state: true,
            message: "Success!",
            data: {
                data: await Article.findAll({
                    where: {
                        state: "ACTIVE"
                    }
                })
            },
            errors: null
        });
    } catch (err) {
        console.log(err)
    }
}

async function articleLikes(req, res) {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (user) {

        const pl = {
            userId: user.id,
            articleId: req.body.articleId,
            isLike: true,
        };

        ArticleLike.findOne({
            where: {
                userId: user.id,
                articleId: req.body.articleId,
            }
        })
            .then(result => {
                if (result) {
                    ArticleLike.update(pl, {
                        where: {
                            userId: user.id,
                            articleId: req.body.articleId,
                        }
                    }).then(() => {
                        return res.status(200).json({
                            state: true,
                            message: "Success!",
                            data: null,
                            errors: null
                        });
                    });
                } else {
                    ArticleLike.create({
                        userId: user.id,
                        articleId: req.body.articleId,
                        isLike: true,
                    }).then(() => {
                        return res.status(200).json({
                            state: true,
                            message: "Success!",
                            data: null,
                            errors: null
                        });
                    })
                }
            }).catch(err => {
            console.log(err)
        })
    } else {
        return res.status(401).json({
            state: false,
            message: "You are not logged in!",
            data: null,
            errors: null
        });
    }
}

async function articleDisLikes(req, res) {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (user) {

        const pl = {
            userId: user.id,
            articleId: req.body.articleId,
            isLike: false,
        };

        ArticleLike.findOne({
            where: {
                userId: user.id,
                articleId: req.body.articleId,
            }
        })
            .then(result => {
                if (result) {
                    ArticleLike.update(pl, {
                        where: {
                            userId: user.id,
                            articleId: req.body.articleId,
                        }
                    }).then(() => {
                        return res.status(200).json({
                            state: true,
                            message: "Success!",
                            data: null,
                            errors: null
                        });
                    });
                } else {
                    ArticleLike.create({
                        userId: user.id,
                        articleId: req.body.articleId,
                        isLike: false,
                    }).then(() => {
                        return res.status(200).json({
                            state: true,
                            message: "Success!",
                            data: null,
                            errors: null
                        });
                    })
                }
            }).catch(err => {
            console.log(err)
        })
    } else {
        return res.status(401).json({
            state: false,
            message: "You are not logged in!",
            data: null,
            errors: null
        });
    }
}

function getContactUs(req, res) {
    res.render("front/home/contact-us");
}

async function postContactUs(req, res) {
    const errArr = [];
    const {first_name, last_name, username, email, captcha, message} = req.body;

    /*try {
        if (parseInt(captcha) === CAPTCHA_NUM) {
            sendEmail(
                first_name,
                last_name,
                username,
                "پیام از طرف من",
                `${message} <br> ایمیل کاربر : ${email}`);

            return res.render("front/home/contact-us", {
                pageTitle: "",
                path: "/contact-us",
                errors: errArr,
            })
        }
        res.send("no");
    } catch (err) {
        console.log(err);
    }*/
}

async function getCaptcha(req, res) {
    /*var p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000));
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);*/
}

module.exports = HomeController;
