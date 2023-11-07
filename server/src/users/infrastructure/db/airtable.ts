import "dotenv/config";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.API_KEY }).base(
  process.env.BASE || ""
);

export default base;
