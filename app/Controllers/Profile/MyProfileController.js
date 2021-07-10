const User = require('../../Models/UserModel');
const userRequest = require('../../../app/Requests/userRequest');
const Validator = require('fastest-validator');
const v = new Validator();
const sharp = require('sharp');
const Formidable = require('formidable');
const uuid = require('uuid').v4;
const jwt = require('jsonwebtoken');

const MyProfileController = {
    index,
    update,
};

async function index(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let user = jwt.decode(token);

    const myUser = await User.findOne({
        where: {
            id: user.id
        }
    });

    if (myUser) {
        return res
            .status(200)
            .json({
                state: true,
                message: "Success!",
                data: {
                    data: myUser
                },
                errors: null
            });
    }
}

async function update(req, res) {
    let form = new Formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        const newEmp = {
            first_name: fields.first_name,
            last_name: fields.last_name,
            username: fields.username,
            email: fields.email,
            mobile: fields.mobile,
            home_phone: fields.home_phone,
            zip_code: fields.zip_code,
            password: fields.password,
            confirmation_password: fields.confirmation_password,
            home_address: fields.home_address,
            work_address: fields.work_address,
        };

        const validate = v.validate(newEmp, userRequest.update());
        let errorArr = [];

        if (validate === true) {

            let oldPath = files.image.path;
            console.log(files.image.path);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            let fileName = `${uniqueSuffix}_${uuid()}_${files.image.name}`;
            let newPath = `C:/nodejs_projects/nodejs_project_10/public/storage/users/${fileName}`;

            await sharp(oldPath)
                .resize(125, 90)
                .png({
                    quality: 90,
                }).jpeg({
                    quality: 90,
                })
                .toFile(newPath)
                .then(async () => {
                    await User.update(newEmp, {
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(async () => {
                            return res.status(200).json({
                                state: true,
                                message: "Success!",
                                data: await User.findOne({where: {id: req.params.id}}),
                                errors: null
                            });
                        });
                })
                .catch(async () => {
                    return res.status(200).json({
                        state: false,
                        message: "Failed!",
                        data: await User.findOne({where: {id: req.params.id}}),
                        errors: null
                    });
                });

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

module.exports = MyProfileController;
