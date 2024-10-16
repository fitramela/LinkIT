
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail', 
//   host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
//   tls: {
//     rejectUnauthorized: false, 
//   },
});


const sendEmailNotification = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to,
    subject,
    text, 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendEmailNotification,
};