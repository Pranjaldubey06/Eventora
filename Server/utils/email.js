// // use nodemailer

// const nodemailer=require('nodemailer');
// const dotenv=require('dotenv');
// dotenv.config();

// const transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:process.env.EMAIL_USER,
//         pass:process.env.EMAIL_PASS
//     }
// })

// exports.sendOtpEmail=async(email,otp,type)=>{
   
//     try{
   
//     const mailOptions={
// from:process.env.EMAIL_USER,
// to: email,
// subject:'YOUR OTP Code',
// text:`Your OTP code is:${otp}`
//  };
//  await transporter.sendMail(mailOptions)
//  console.log(`OTP email sent to ${email} for ${type}`)
// }
// catch(error){
// console.error(`Error sending OTP email to ${email} fo ${type}:`,error)
// }
// } 


const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTPEmail = async (userEmail, otp, type) => {

    try {

        const title =
            type === 'account_verification'
                ? 'Verify your Eventora Account'
                : 'Event Booking Verification OTP';

        const msg =
            type === 'account_verification'
                ? 'Please use the following OTP to verify your new Eventora account.'
                : 'Please use the following OTP to verify and confirm your event booking.';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: title,

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                    background-color: #f4f4f4;
                ">

                    <div style="
                        max-width: 500px;
                        margin: auto;
                        background: #ffffff;
                        padding: 30px;
                        border-radius: 12px;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    ">

                        <h2 style="color: #111;">
                            ${title}
                        </h2>

                        <p style="
                            color: #555;
                            font-size: 16px;
                            line-height: 1.6;
                        ">
                            ${msg}
                        </p>

                        <div style="
                            margin: 20px auto;
                            padding: 15px;
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 5px;
                            background: #eef2ff;
                            color: #4f46e5;
                            width: fit-content;
                            border-radius: 10px;
                        ">
                            ${otp}
                        </div>

                        <p style="
                            color: #777;
                            font-size: 14px;
                        ">
                            This OTP is valid for 10 minutes.
                        </p>

                        <p style="
                            color: #999;
                            font-size: 13px;
                            margin-top: 25px;
                        ">
                            If you did not request this email, please ignore it.
                        </p>

                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        console.log(`OTP email sent to ${userEmail} for ${type}`);

    } catch (error) {

        console.error(
            `Error sending OTP email to ${userEmail} for ${type}:`,
            error
        );

    }
};

module.exports = sendOTPEmail;