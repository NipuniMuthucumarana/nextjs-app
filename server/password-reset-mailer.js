const nodemailer = require('nodemailer');

exports.sendPasswordResetEmail = function({toUser, id}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD
      }
    })

console.log(process.env.GOOGLE_USER)

    const message = {
      from: process.env.GOOGLE_USER,
      // to: toUser.email 
      to: process.env.GOOGLE_USER,
      subject: 'Password reset request',
      html: `
        <h3> Hello ${toUser.username} </h3>
        <h4>Password reset requested!</h4>
        <p>A password reset was requested for your account ${toUser.email}.If you did not make the request, please ignore this message.</p>
        <p>In order to change your password, please follow this link: <a target="_" href="${process.env.DOMAIN}/reset-password/${id}"><button>Change Password</button></a></p>
        <p>Cheers</p>
        <p>Your Application Team</p>
      `
    }

    transporter.sendMail(message, function(err, info) {
      if (err) {
        rej(err)
      } else {
        res(info)
      }
    })
  })
}

