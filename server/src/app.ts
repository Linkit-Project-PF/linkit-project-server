import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import userRoute from './users/infrastructure/routes/user.routes'
// import base from "./users/infrastructure/db/airtable"; //* Decomment if testing airtable.

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT ?? 3000

app.use(userRoute)

app.listen(port, () => {
  console.log(`Listen in port: ${port}`)
})
