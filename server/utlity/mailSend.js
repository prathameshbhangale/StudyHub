import nodemailer from 'nodemailer'

let transporter;

// const maileFunctionalityAdd = () => {
//     try {
//         transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_ADDRESS,
//                 pass: process.env.EMAIL_PASSWORD
//             }
//         })
//     }catch (err) {
//         console.log('error in mail connect / Nodemailer.js ',err)
//     }
// }

// maileFunctionalityAdd()


const mailSender = async (email, title, body) => {
    try {
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        secure: false,
      })
  
      let info = await transporter.sendMail({
        from: `"Studynotion | CodeHelp" <${process.env.MAIL_USER}>`, // sender address
        to: `${email}`, // list of receivers
        subject: `${title}`, // Subject line
        html: `${body}`, // html body
      })
      console.log(info.response)
      return info
    } catch (error) {
      console.log(error.message)
      return error.message
    }
  }
  
export default mailSender