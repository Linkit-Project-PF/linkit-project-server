export interface IAddress {
  email: string
  name: string
}

export interface IMessage {
  to: IAddress
  from: IAddress
  subject: string
  html: string
}

export interface AddEmailAccount {
  sendEmail: (message: IMessage) => Promise<void>
}
