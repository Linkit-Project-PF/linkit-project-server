import 'dotenv/config'
import Airtable from 'airtable'


const base = new Airtable({ apiKey: process.env.API_KEY }).base(
  process.env.AIRTABLE_BASE ?? ''
)
export default base

//! EXAMPLE TO GET USERNAME from all users on table.
