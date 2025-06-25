const nodemailer = require("nodemailer");
const verifieduser = async (email, name, role) => {
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
    subject: "Verified Done",
    text: `Congratulations ${name},\nYour account has been successfully verified.Now you are the member of our team as a ${role} \n Thank you for verifying your email!`,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = verifieduser;
