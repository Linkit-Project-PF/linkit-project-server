import { Router } from 'express'
import contactUsRouter from './contactus.routes'
import googleRoute from './google.routes'
import stackRouter from './technologies.routes'
import clientsFollowUpRoute from './clientsFollowUp.routes'
import candidatePrsentationRoute from './Recruiter candidate presentation.routes'

const resourcesRoute = Router()

resourcesRoute.use('/contactus', contactUsRouter)
resourcesRoute.use('/googleSheet', googleRoute)
resourcesRoute.use('/stackList', stackRouter)
resourcesRoute.use('/clientsFollowUp', clientsFollowUpRoute)
resourcesRoute.use('/candidatePresentation', candidatePrsentationRoute)
export default resourcesRoute
