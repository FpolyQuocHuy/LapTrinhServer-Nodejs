const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler');
// require('.env')
const sendMail = asyncHandler(async ({ email , otp}) => {
    let transporter = nodemailer.createTransport({
        host: "localhost:5000",
        port: 5000,
        service:'gmail',
        auth: {
            user: 'huy343536@gmail.com', 
            pass: 'nnbgiwwyqlylqodb', 
        },
    });

    const mailOptions = {
      from: 'huy343536@gmail.com', 
      to: email,
      subject: "Forgot password - OTP",
      text: `Your OTP: ${otp}`,
  };
  try {
   let info = await transporter.sendMail(mailOptions);
   console.log("Send mail successfuly");
   return info;
 } catch (error) {
   console.error("Error sending email:", error);
   throw error;
 }
});

module.exports = sendMail