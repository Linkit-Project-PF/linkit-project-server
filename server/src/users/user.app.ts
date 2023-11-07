import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const port = (process.env.PORT != null) || 3000

app.listen(port, () => { console.log(`Listen in port: ${port}`) })
