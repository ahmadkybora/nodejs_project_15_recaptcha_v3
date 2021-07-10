const nodeMailer = require('nodemailer');
const Mailer = require('./Mailer');

const SignUp = {
    sendEmail,
};

async function sendEmail(email, username, subject, message) {
    const transporter = await nodeMailer.createTransport(Mailer);
    return transporter.sendMail({
        from: "amontazeri53@gmail.com",
        to: email,
        subject: subject,
        html: `<h1>hello ${username}</h1><p>${message}</p>`,
    })
        .then(result => {
            if (result) {
                console.log(result)
            }
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = SignUp;
