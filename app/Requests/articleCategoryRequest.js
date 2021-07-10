const ArticleCategoryRequest = {
    create,
    update,
};

async function create() {
    const ArticleCategoryRequest = {
        employeeId: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        name: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "نام دسته بندی الزامی است",
                stringMin: "نام دسته بندی نباید کمتر از 2 کلمه باشد",
                stringMax: "نام دسته بندی نباید بیشتر از 255 کلمه باشد",
            }
        },
        description: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "توضیحات الزامی است",
                stringMin: "توضیحات نباید کمتر از 2 کلمه باشد",
                stringMax: "توضیحات نباید بیشتر از 255 کلمه باشد",
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
    const ArticleCategoryRequest = {
        employeeId: {
            type: "number",
            messages: {
                required: "نام گارمند الزامی است",
            }
        },
        name: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "نام دسته بندی الزامی است",
                stringMin: "نام دسته بندی نباید کمتر از 2 کلمه باشد",
                stringMax: "نام دسته بندی نباید بیشتر از 255 کلمه باشد",
            }
        },
        description: {
            type: "string",
            trim: true,
            min: 2,
            max: 255,
            messages: {
                required: "توضیحات الزامی است",
                stringMin: "توضیحات نباید کمتر از 2 کلمه باشد",
                stringMax: "توضیحات نباید بیشتر از 255 کلمه باشد",
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

module.exports = ArticleCategoryRequest;
