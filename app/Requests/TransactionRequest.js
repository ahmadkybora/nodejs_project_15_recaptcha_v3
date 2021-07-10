const TransactionRequest = {
    create,
    update,
};

async function create() {
    const TransactionRequest = {
        /*employeeId: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },*/
        userId: {
            type: "number",
            messages: {
                required: "نام کاربر الزامی است",
            }
        },
        transaction_code: {
            type: "number",
            messages: {
                required: "کد تراکنش الزامی است",
            }
        },
        amount: {
            type: "number",
            messages: {
                required: "مقدار تراکنش الزامی است",
            }
        },
        /*state: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        confirmedAt: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        transactedAt: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },*/
    };
}

async function update() {
    const TransactionRequest = {
        employeeId: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        userId: {
            type: "number",
            messages: {
                required: "نام کاربر الزامی است",
            }
        },
        transaction_code: {
            type: "number",
            messages: {
                required: "کد تراکنش الزامی است",
            }
        },
        amount: {
            type: "number",
            messages: {
                required: "مقدار تراکنش الزامی است",
            }
        },
        state: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        confirmedAt: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
        transactedAt: {
            type: "number",
            messages: {
                required: "نام کارمند الزامی است",
            }
        },
    };
}

module.exports = TransactionRequest;
