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
        html: `<h1 style="text-align: center">Welcome To Nodejs Project</h1><br/>
               <img src="../../public/img/system.png"><br>
               <h1>Reset Your Password</h1><br/>
               <p>Dear User ${username}, Please Verify
                  Your Reset Password Via Click The Bellow Link. 
                  If You Don't Reset Your Password In Our Website, Please Do Not
                  Attention This Mail.</p><br/>
                  <p>${message}</p>
                  <button><a href="${message}">Reset Your Password Now</a></button><br/>
               Thanks,<br>`,
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
