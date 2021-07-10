const smtpTransport = require('nodemailer-smtp-transport');

const Mailer = smtpTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
});

module.exports = Mailer;

