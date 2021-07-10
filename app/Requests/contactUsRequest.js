const contactUsRequest = {
    first_name: {
        type: "string",
        trim: true,
        min: 2,
        max: 255,
        message: {
            required: "نام الزامی است",
            stringMin: "نام نباید کمتر از 2 کلمه باشد",
            stringMax: "نام نباید بیشتر از 255 کلمه باشد",
        }
    },
    last_name: {
        type: "string",
        trim: true,
        min: 2,
        max: 255,
        messages: {
            required: "نام خانوادگی الزامی است",
            stringMin: "نام خانوادگی نباید کمتر از 2 کلمه باشد",
            stringMax: "نام خانوادگی نباید بیشتر از 255 کلمه باشد",
        }
    },
    username: {
        type: "string",
        trim: true,
        min: 2,
        max: 255,
        unique: true,
        messages: {
            required: "نام کاربری الزامی است",
            stringMin: "نام کاربری نباید کمتر از 2 کلمه باشد",
            stringMax: "نام کاربری نباید بیشتر از 255 کلمه باشد",
        }
    },
    email: {
        type: "email",
        normalize: true,
        min: 2,
        max: 255,
        unique: true,
        messages: {
            required: "ایمیل الزامی است",
            string: "ایمیل اشتباه است"
        }
    },
    captcha: {
        type: "string",
        trim: true,
        min: 8,
        max: 255,
        unique: true,
        messages: {
            required: "کلمه عبور الزامی است",
            string: "کلمه عبور اشتباه است",
            stringMin: "کلمه عبور نباید کمتر از 8 گلمه باشد",
            stringMax: "کلمه عبور نباید بیشتر از 255 گلمه باشد",
        }
    },
    message: {
        type: "string",
        trim: true,
        min: 8,
        max: 255,
        unique: true,
        messages: {
            required: "تکرار کلمه عبور الزامی است",
            string: "تکرار کلمه عبور اشتباه است",
            stringMin: "تکرار کلمه عبور نباید کمتر از 8 گلمه باشد",
            stringMax: "تکرار کلمه عبور نباید بیشتر از 255 گلمه باشد",
        }
    }
};

module.exports = contactUsRequest;
