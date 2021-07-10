const isLoggedIn = require('../middlewares/isLoggedIn');

const isLoggedOut = (req, res, next) => {
    if (req.session.isLoggedIn) {
    //if (isLoggedIn) {
        res.redirect('back');
    } else {
        next();
    }
};

module.exports = isLoggedOut;

