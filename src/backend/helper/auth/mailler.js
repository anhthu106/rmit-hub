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
            <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8; font-family: 'Roboto', sans-serif;" leftmargin="0">
                <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8">
                    <tr>
                        <td>
                            <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                align="center" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:left;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:0 35px;">
                                                    <h1
                                                        style="color:#063e5d; font-weight:500; margin:0;font-size:32px;font-family:'Poppins',sans-serif; text-align:center;">
                                                        Verify your email
                                                        <span
                                                            style="display:block; margin-left:auto; margin-right:auto; margin-top:19px; margin-bottom:30px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                    </h1>

                                                    <p
                                                        style="color:#455056; font-size:17px;line-height:24px; margin:0;font-weight:500;">
                                                        Hi ${toUser.username},</p>
                                                    <br />
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">

                                                        Thank you for registering our application! Before we get started, we
                                                        need to confirm that it is really you. Please click on the button below to
                                                        verify your email address:
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:center;">
                                                    <a href="${process.env.DOMAIN}/api/auth/active/${token}"
                                                        style="background:#ffa350;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;text-align:center;">
                                                        Verify your email</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:35px; padding-top:10px;">
                                                    <p style="margin-bottom:0px;">
                                                        Regards,
                                                    </p>
                                                    <p>RMIT Hub</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
       `
    }

    return sendEmail(message)
}

exports.recoverPasswordEmail = function ({ email, token }) {
    const message = {
        from: process.env.GOOGLE_USER,
        to: `${email}`,

        subject: "Reset password",
        html: `
            <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8; font-family: 'Roboto', sans-serif;" leftmargin="0">
                <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8">
                    <tr>
                        <td>
                            <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                align="center" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:left;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:0 35px;">
                                                    <h1
                                                        style="color:#063e5d; font-weight:500; margin:0;font-size:32px;font-family:'Poppins',sans-serif; text-align:center;">
                                                        Recover your password
                                                        <span
                                                            style="display:block; margin-left:auto; margin-right:auto; margin-top:19px; margin-bottom:30px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                    </h1>

                                                    <p
                                                        style="color:#455056; font-size:17px;line-height:24px; margin:0;font-weight:500;">
                                                        Hi ${email},</p>
                                                    <br />
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                        Thank you for using our application. If you forget your password, please click on the button below to recover your password:
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:center;">
                                                    <a href="${process.env.DOMAIN}/recover/${token}";
                                                        style="background:#ffa350;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;text-align:center;">
                                                        Recover your password
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:35px; padding-top:10px;">
                                                    <p style="margin-bottom:0px;">
                                                        Regards,
                                                    </p>
                                                    <p>RMIT Hub</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        `
    }
    return sendEmail(message)
}

// Request to join team
exports.requestToJoinTeam = function ({ leaderEmail, memberName, teamID }) {
    const message = {
        from: process.env.GOOGLE_USER,
        to: `${leaderEmail}`,
        subject: "Request to join team",
        html: `
            <div> Hello ${leaderEmail} </div>
            <div> ${memberName} requests to join your team! </div>
            <a href="${process.env.DOMAIN}/team/${teamID}/pendingList";
                style="background:#ffa350;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;text-align:center;">
                View the team pending list here!
            </a>
        `
    }
    return sendEmail(message)
}