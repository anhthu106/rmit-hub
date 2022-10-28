const nodemailder = require("nodemailer")

function sendEmail(message) {
    return new Promise((res, rej) => {
        const transporter = nodemailder.createTransport({
            service: "hotmail",
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD
            }
        })
        transporter.sendMail(message, function (err, info) {
            if (err) {
                rej(err)
            } else {
                res(info)
            }
        })
    })
}

exports.sendConfirmationEmail = function ({ toUser, token }) {
    const message = {
        from: process.env.GOOGLE_USER,
        to: `${toUser.email}`,        
        subject: "Your App - Activate Account",
        html: `
           <h3>Hello ${toUser.username}</h3>
           <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you..</p>
           <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/auth/active/${token}"</a>${process.env.DOMAIN}/auth/active/${token}</p>
           <p>Cheers</p>
           <p>Your Application Team</p>
       `
    }

    return sendEmail(message)
}