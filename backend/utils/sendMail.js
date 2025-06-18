const nodemailer = require("nodemailer");

const sendOTP = async (email, otp) => {
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
    text: `Ram Ram Bhai Saara ne yo pakdo otp: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
