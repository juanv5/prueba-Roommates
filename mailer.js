const nodemailer = require('nodemailer')

const enviar = (to, subject, html) => {
    return new Promise((resolve, reject) => {

        const transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth: {
                user: 'juanvegadiaz10@yahoo.com',
                pass: 'esplaa2022',
            },
        })

        const mailOptions = {
            from: 'juanvegadiaz10@yahoo.com',
            to,
            subject,
            html,
        }
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) console.log(err)
            if (data) console.log(data)
        })

    })

}
module.exports = enviar