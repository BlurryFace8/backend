"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(mailOptions) {
  // Generate test SMTP service account from ethereal.email

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    prot: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,// generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    text:  mailOptions.text,
    html: mailOptions.html,
  });

  console.log("Email sent successfully.");
  
}

module.exports= sendEmail
