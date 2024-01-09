import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import adminRoute from './users/infrastructure/routes/admin.routes'
import mongoDBConnect from './db/mongo'
import userRoute from './users/infrastructure/routes/user.routes'
import postRoute from './posts/infrastructure/routes/post.routes'
import jdRoute from './posts/infrastructure/routes/jd.routes'
import companyRoute from './users/infrastructure/routes/company.routes'
import authRoute from './users/authentication/Infrastructure/auth.routes'
import reviewRoute from './posts/infrastructure/routes/review.routes'
import OKRRoute from './posts/infrastructure/routes/OKRs.routes'
import resourcesRoute from './resources/infrastructure/routes/resources.routes'
import { authValidator, langValidator } from './middlewares'
import postulationRoute from './postulations/infrastructure/routes/postulation.route'

const app = express()
app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
  }
))

app.use(express.json())

const port = process.env.PORT ?? 3000

app.use(langValidator)
app.use('/resources', resourcesRoute)
app.use('/postulations', postulationRoute)
app.use('/auth', authRoute)

app.use(authValidator)
app.use('/admins', adminRoute)
app.use('/users', userRoute)
app.use('/companies', companyRoute)
app.use('/posts', postRoute)
app.use('/jds', jdRoute)
app.use('/reviews', reviewRoute)
app.use('/OKRs', OKRRoute)

mongoDBConnect().then(() => {
  app.listen(port, () => {
    console.log(`Listen in port: ${port}`)
  })
}).catch((error) => { console.log(error) })
