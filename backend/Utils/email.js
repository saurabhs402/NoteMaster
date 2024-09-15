const nodemailer = require('nodemailer')


const sendEmail = async function (options) {
    console.log("hh:",options)

    // Create a transporter
    const transporter = nodemailer.createTransport({
        secure:true,
        host: 'smtp.gmail.com',
        port:465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    // Define email options
  console.log("Transporter:",transporter)
    const emailOptions = {
        from: process.env.EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    return transporter.sendMail(emailOptions);
}

module.exports = sendEmail;