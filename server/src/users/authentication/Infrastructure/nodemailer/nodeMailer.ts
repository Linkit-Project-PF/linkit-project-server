import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'
import { type AddEmailAccount, type IMessage } from './add-email'

export class MailNodeMailerProvider implements AddEmailAccount {
  private readonly transporter: Mail

  constructor () {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      },
      debug: true
    })
  }

  async sendEmail (message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email
      },
      from: {
        name: message.from.name,
        address: message.from.email
      },
      subject: message.subject,
      html: message.html
    })
  }
}
