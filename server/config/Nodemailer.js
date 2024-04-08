import nodemailer from 'nodemailer'

const maileFunctionalityAdd = () => {
    try {
        const transporter = nodemailer.createTransport({
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

export default maileFunctionalityAdd