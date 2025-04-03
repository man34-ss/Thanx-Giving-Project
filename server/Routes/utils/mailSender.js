const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.FROM,
    pass: process.env.MAIL_PASS
  },
});

exports.sendMail = async (title, body, to) => {
    console.log("Send mail initiated")
    const mailSendResponse = await transporter.sendMail({
        from: `"Thanks-Giving" <${process.env.FROM}>`, // Sender's address
        to: to, // list of receivers
        subject: title, // Subject line
        html: body
    });

    console.log("Mail send response: ", mailSendResponse)
}

