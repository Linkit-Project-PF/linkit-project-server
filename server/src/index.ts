// googleSheets.ts
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

export async function listMajors (auth: any): Promise<any> {
  const sheets = google.sheets({ version: 'v4', auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1AxT5RFTEqyOsGYAAzaA5cGNblAEZxOPWhorVDt84qGU',
    range: 'exampleSheet!A2:J'
  })
  const rows = res.data.values
  if (!rows || rows.length === 0) {
    console.log('No data found.')
    return []
  }
  return rows.map((row) => ({
    pricing_client: row[0],
    position: row[1],
    tier_technologie: row[2],
    english_level: row[3],
    entry_level: row[4],
    semi_Senior: row[5],
    senior1: row[6],
    senior2: row[7],
    senior_advanced: row[8],
    manager_lead: row[9]
  }))
}
