const Yup = require("yup");

const userRequestValidation = Yup.object().shape({
    first_name: Yup.string()
        .min(4, "نام نباید کمتر از 4 حرف باشد")
        .max(255, "نام نباید بیشتر از 255 حرف باشد")
        .required("نام الزامی است"),

    last_name: Yup.string()
        .min(4, "نام خانوادگی نباید کمتر از 4 حرف باشد")
        .max(255, "نام خانوادگی نباید بیشتر از 255 حرف باشد")
        .required("نام خانوادگی الزامی است"),

    email: Yup.string()
        .email("ایمیل اشتباه است")
        .required("ایمیل الزامی است"),

    password: Yup.string()
        .min(8, "رمز عبور نباید کمتر از 8 حرف باشد")
        .max(255, "رمز عبور نباید کمتر از 255 حرف باشد")
        .required("رمز عبور الزامی است"),

    confirmation_password: Yup.string()
        .required("پسورد مطابقت ندارد")
        .oneOf([Yup.ref("password"), null, "پسورد مطابقت ندارد"]),
});

module.exports = userRequestValidation;
