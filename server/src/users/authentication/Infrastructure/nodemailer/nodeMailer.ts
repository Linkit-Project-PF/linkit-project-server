import nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'
import { type AddEmailAccount, type IMessage } from './add-email'

export class MainNodeMailerProvider implements AddEmailAccount {
  private readonly transporter: Mail

  constructor (transporter: Mail) {
    this.transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    })
  }
  // test

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
