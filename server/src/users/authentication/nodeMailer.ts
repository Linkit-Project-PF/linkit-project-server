import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: '',
    pass: ''
  }
})

void transporter.verify().then(async () => {
  console.log('Ready for send emails')
})

//* Transporter for send emails
// this is the transporter for send emails, you can use this transporter for send emails
void transporter.sendMail({
  from: '"Fred Foo 👻" <linkit.project.henry@gmail.com>',
  to: '', // user.email
  subject: '',
  html: '' // the html template
})
