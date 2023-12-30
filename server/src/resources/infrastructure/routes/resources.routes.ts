import { Router } from 'express'
import contactUsRouter from './contactus.routes'
import googleRoute from './google.routes'
import stackRouter from './technologies.routes'
import clientsFollowUpRoute from './companyJDs.routes'
import candidatePrsentationRoute from './activePostul.routes'
import countriesRouter from './countries.routes'
import techStackRouter from './techStack.routes'

const resourcesRoute = Router()

resourcesRoute.use('/contactus', contactUsRouter)
resourcesRoute.use('/googleSheet', googleRoute)
resourcesRoute.use('/stackList', stackRouter)
resourcesRoute.use('/companyjds', clientsFollowUpRoute)
resourcesRoute.use('/activePostul', candidatePrsentationRoute)
resourcesRoute.use('/countries', countriesRouter)
resourcesRoute.use('/techStack', techStackRouter)

export default resourcesRoute
