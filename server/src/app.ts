import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoDBConnect from './db/mongo'
import userRoute from './users/infrastructure/routes/user.routes'
import postRoute from './posts/infrastructure/routes/post.routes'

const app = express()
app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
))
app.use(express.json())

const port = process.env.PORT ?? 3000

app.use('/users', userRoute)
app.use('/posts', postRoute)

mongoDBConnect().then(() => {
  app.listen(port, () => {
    console.log(`Listen in port: ${port}`)
  })
}).catch((error) => { console.log(error) })
