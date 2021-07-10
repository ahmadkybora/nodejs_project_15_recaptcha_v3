const {formatDate} = require('../../../helpers/jalali');
const isLoggedIn = require('../../../middlewares/isLoggedIn');

const DashboardController = {
    index
};

function index(req, res) {
    return res
        .status(403)
        .json({
            state: true,
            message: "Forbidden!",
            data: {
                data: null,
            },
            errors: null
        });
}

module.exports = DashboardController;

