import nodemailer from 'nodemailer'

let transporter

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
export {transporter}

export default maileFunctionalityAdd
