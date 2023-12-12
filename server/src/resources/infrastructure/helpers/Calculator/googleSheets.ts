import * as fs from 'fs/promises'
import * as path from 'path'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const TOKEN_PATH = path.join(process.cwd(), 'token.json')

const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json')

export async function authorize (): Promise<any> {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

async function loadSavedCredentialsIfExist (): Promise<any> {
  try {
    const content = await fs.readFile(TOKEN_PATH, 'utf-8')
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

async function saveCredentials (client: { credentials: { refresh_token: any } }): Promise<any> {
  const content = await fs.readFile(CREDENTIALS_PATH, 'utf-8')
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token
  })
  await fs.writeFile(TOKEN_PATH, payload, 'utf-8')
}

export async function getCalculatorTable (auth: any): Promise<any> {
  const sheets = google.sheets({ version: 'v4', auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1AxT5RFTEqyOsGYAAzaA5cGNblAEZxOPWhorVDt84qGU',
    range: 'exampleSheet!H3:T'
  })
  const rows = res.data.values
  if (!rows || rows.length === 0) {
    console.log('No data found.')
    return []
  }
  const calculatorTable = rows.map((row) => ({
    position: row[0],
    tier_technologie: row[1],
    english_level: row[2],
    entry_level_min: row[3],
    entry_level_max: row[4],
    semi_Senior_min: row[5],
    semi_Senior_max: row[6],
    senior_min: row[7],
    senior_max: row[8],
    senior_advanced_min: row[9],
    senior_advanced_max: row[10],
    manager_lead_min: row[11],
    manager_lead_max: row[12]
  }))
  return calculatorTable
}

export async function getTiers (auth: any): Promise<any> {
  const sheets = google.sheets({ version: 'v4', auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1AxT5RFTEqyOsGYAAzaA5cGNblAEZxOPWhorVDt84qGU',
    range: 'exampleSheet!A3:D'
  })
  const rows = res.data.values
  if (!rows || rows.length === 0) {
    console.log('No data found.')
    return []
  }
  const techTier1 = rows.map((row) => (
    row[0]
  ))
  const frameworksTier1 = rows.map((row) => (
    row[1]
  ))
  const othersTier1 = rows.map((row) => (
    row[2]
  ))
  const techTier2 = rows.map((row) => (
    row[3]
  ))
  return { techTier1, frameworksTier1, othersTier1, techTier2 }
}