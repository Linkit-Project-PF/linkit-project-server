import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import adminRoute from './users/infrastructure/routes/admin.routes'
import mongoDBConnect from './db/mongo'
import userRoute from './users/infrastructure/routes/user.routes'
import postRoute from './posts/infrastructure/routes/post.routes'
import companyRoute from './users/infrastructure/routes/company.routes'
import authRoute from './users/authentication/Infrastructure/auth.routes'

const app = express()
app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
  }
))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

app.use(express.json())

const port = process.env.PORT ?? 3000

app.use('/admins', adminRoute)
app.use('/companies', companyRoute)
app.use('/users', userRoute)
app.use('/posts', postRoute)
app.use('/auth', authRoute)

mongoDBConnect().then(() => {
  app.listen(port, () => {
    console.log(`Listen in port: ${port}`)
  })
}).catch((error) => { console.log(error) })
