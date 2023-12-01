import { Router } from 'express'
import contactUsRouter from './contactus.routes'
import googleRoute from './google.routes'
import stackRouter from './technologies.routes'

const resourcesRoute = Router()

resourcesRoute.use('/contactus', contactUsRouter)
resourcesRoute.use('/googleSheet', googleRoute)
resourcesRoute.use('/stackList', stackRouter)

export default resourcesRoute
