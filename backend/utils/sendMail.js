const nodemailer = require("nodemailer");

const sendOTP = async (email, name, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP Verification",
    text: `Hi ${name}, \n This is your: ${otp}\n\nPlease use this OTP to verify your employee account`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
