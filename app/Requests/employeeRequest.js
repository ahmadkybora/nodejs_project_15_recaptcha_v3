const EmployeeRequest = {
    create,
    update,
};

async function create() {
    const EmployeeRequest = {
        first_name: {
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
            messages: {
                required: "نام کاربری الزامی است",
                stringMin: "نام کاربری نباید کمتر از 2 کلمه باشد",
                stringMax: "نام کاربری نباید بیشتر از 255 کلمه باشد",
            }
        },
        email: {
            type: "email",
            trim: true,
            messages: {
                required: "ایمیل الزامی است",
            }
        },
        mobile: {
            type: "string",
            trim: true,
            min: 11,
            max: 15,
            customRegex: '/[0-9]*/',
            messages: {
                required: "شماره موبایل الزامی است",
                stringMin: "شماره موبایل نباید کمتر از 11 کلمه باشد",
                stringMax: "شماره موبایل نباید بیشتر از 15 کلمه باشد",
            }
        },
        home_phone: {
            type: "string",
            trim: true,
            min: 11,
            max: 15,
            customRegex: '/[0-9]*/',
            messages: {
                stringMin: "تلفن منزل نباید کمتر از 1 کلمه باشد",
                stringMax: "تلفن منزل نباید بیشتر از 15 کلمه باشد",
            }
        },
        password: {
            type: "string",
            trim: true,
            min: 2,
            max: 25,
            messages: {
                required: "پسورد الزامی است",
                stringMin: "پسورد نباید کمتر از 8 کلمه باشد",
                stringMax: "پسورد نباید بیشتر از 25 کلمه باشد",
            }
        },
        confirmation_password: {
            type: "string",
            trim: true,
            min: 2,
            max: 25,
            messages: {
                required: "تایید رمز عبور الزامی است",
                stringMin: "تایید رمز عبور نباید کمتر از 8 کلمه باشد",
                stringMax: "تایید رمز عبور نباید بیشتر از 25 کلمه باشد",
            }
        },
        home_address: {
            type: "string",
            trim: true,
            min: 2,
            max: 1500,
            messages: {
                stringMin: "آدرس محل کار نباید کمتر از 2 کلمه باشد",
                stringMax: "آدرس محل کار نباید بیشتر از 1500 کلمه باشد",
            }
        },
        work_address: {
            type: "string",
            trim: true,
            min: 2,
            max: 1500,
            messages: {
                stringMin: "آدرس منزل نباید کمتر از 2 کلمه باشد",
                stringMax: "آدرس منزل نباید بیشتر از 1500 کلمه باشد",
            }
        },
        state: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "وضعیت الزامی است",
            }
        },
    };
}

async function update() {
    const EmployeeRequest = {
        first_name: {
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
            messages: {
                required: "نام کاربری الزامی است",
                stringMin: "نام کاربری نباید کمتر از 2 کلمه باشد",
                stringMax: "نام کاربری نباید بیشتر از 255 کلمه باشد",
            }
        },
        email: {
            type: "email",
            trim: true,
            messages: {
                required: "ایمیل الزامی است",
            }
        },
        mobile: {
            type: "string",
            trim: true,
            min: 11,
            max: 15,
            customRegex: '/[0-9]*/',
            messages: {
                required: "شماره موبایل الزامی است",
                stringMin: "شماره موبایل نباید کمتر از 11 کلمه باشد",
                stringMax: "شماره موبایل نباید بیشتر از 15 کلمه باشد",
            }
        },
        home_phone: {
            type: "string",
            trim: true,
            min: 11,
            max: 15,
            customRegex: '/[0-9]*/',
            messages: {
                stringMin: "تلفن منزل نباید کمتر از 1 کلمه باشد",
                stringMax: "تلفن منزل نباید بیشتر از 15 کلمه باشد",
            }
        },
        password: {
            type: "string",
            trim: true,
            min: 2,
            max: 25,
            messages: {
                required: "پسورد الزامی است",
                stringMin: "پسورد نباید کمتر از 8 کلمه باشد",
                stringMax: "پسورد نباید بیشتر از 25 کلمه باشد",
            }
        },
        confirmation_password: {
            type: "string",
            trim: true,
            min: 2,
            max: 25,
            messages: {
                required: "تایید رمز عبور الزامی است",
                stringMin: "تایید رمز عبور نباید کمتر از 8 کلمه باشد",
                stringMax: "تایید رمز عبور نباید بیشتر از 25 کلمه باشد",
            }
        },
        home_address: {
            type: "string",
            trim: true,
            min: 2,
            max: 1500,
            messages: {
                stringMin: "آدرس محل کار نباید کمتر از 2 کلمه باشد",
                stringMax: "آدرس محل کار نباید بیشتر از 1500 کلمه باشد",
            }
        },
        work_address: {
            type: "string",
            trim: true,
            min: 2,
            max: 1500,
            messages: {
                stringMin: "آدرس منزل نباید کمتر از 2 کلمه باشد",
                stringMax: "آدرس منزل نباید بیشتر از 1500 کلمه باشد",
            }
        },
        state: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "وضعیت الزامی است",
            }
        },
    };
}

module.exports = EmployeeRequest;
