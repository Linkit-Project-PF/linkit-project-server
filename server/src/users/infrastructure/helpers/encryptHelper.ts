import 'dotenv/config'
import { createCipheriv, createDecipheriv, createHash } from 'crypto'

const algorithm = 'aes-256-cbc'
const key = createHash('sha256').update(process.env.ENCRYPT_KEY ?? '48mdS66YSequ2oS8t2ofO6B85XpwY7su').digest('hex').slice(0, 32)
const fixedIV = process.env.ENCRYPT_IV ?? 'aabbccddeeff00112233445566778899'
const iv = Buffer.from(fixedIV, 'hex')

export function encrypt (text: string): string {
  const cipher = createCipheriv(algorithm, Buffer.from(key), iv)
  let encrypted = cipher.update(text, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

export function decrypt (encryptedText: string): string {
  const decipher = createDecipheriv(algorithm, Buffer.from(key), iv)
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8')
  decrypted += decipher.final('utf-8')
  return decrypted
}
