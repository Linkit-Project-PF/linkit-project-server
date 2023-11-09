import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoDBConnect from './db/mongo'
import userRoute from './users/infrastructure/routes/user.routes'

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT ?? 3000

app.use('/users', userRoute)

mongoDBConnect().then(() => {
  app.listen(port, () => {
    console.log(`Listen in port: ${port}`)
  })
}).catch((error) => { console.log(error) })
