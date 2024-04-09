import nodemailer from 'nodemailer'

let transporter;

const maileFunctionalityAdd = () => {
    try {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }catch (err) {
        console.log('error in mail connect / Nodemailer.js ',err)
    }
}

maileFunctionalityAdd()

const sendMail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to,
            subject,
            text
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (err) {
        console.error('Error sending email:', err);
    }
}

export default sendMail