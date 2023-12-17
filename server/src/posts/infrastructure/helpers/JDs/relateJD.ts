import { type Types } from 'mongoose'
import Company from '../../../../users/infrastructure/schema/Company'
import { ServerError, UncatchedError } from '../../../../errors/errors'
import { objectIDValidator } from '../../../../users/infrastructure/helpers/validateObjectID'
import Admin from '../../../../users/infrastructure/schema/Admin'
import { type JdEntity } from '../../../domain/jd/jd.entity'

export async function RelateJD (JD: JdEntity, operation: string): Promise<void> {
  try {
    const JDid = (JD as any)._id
    const compID = JD.company
    const company = await Company.findById(compID)
    if (company) {
      if (operation === 'create') {
        await RelateRecruiters(JDid, JD.recruiter, 'create')
        company.jds.push(JDid)
        await Company.findOneAndReplace({ _id: compID }, company)
      } else if (operation === 'delete') {
        await RelateRecruiters(JDid, JD.recruiter, 'delete')
        let index: number = -1
        company.jds.forEach((jd, idx) => {
          if (jd.toString() === JDid.toString()) { index = idx }
        })
        if (index < 0) throw new ServerError('Unable to delete, JD is not related with this company', 'No se puede eliminar, la JD no esta relacionada a esta empresa', 404)
        company.jds.splice(index, 1)
        await Company.findOneAndReplace({ _id: compID }, company)
      } else throw new ServerError('Not a valid operation to relateJD', 'Operacion invalida al relacionar vacante', 406)
    } else throw new ServerError('Company not found', 'Empresa no encontrada', 404)
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'Adding JD to company', 'adicionar vacante a empresa')
  }
}

export async function RelateRecruiters (JD: Types.ObjectId, recruiterIds: Types.ObjectId[], operation: string): Promise<void> {
  try {
    recruiterIds.forEach(id => objectIDValidator(id.toString(), 'one of the recruiters', 'alguno de los reclutadores'))
    for (let i = 0; i < recruiterIds.length; i++) {
      const recruiter = await Admin.findById(recruiterIds[i])
      if (!recruiter) throw new ServerError('One of the recruiter was not found on admin register', 'Alguno de los reclutadores no se encontro en la lista de administradores', 406)
      if (operation === 'create') {
        recruiter.recruiterOf.push(JD)
        await Admin.findOneAndReplace({ _id: recruiterIds[i] }, recruiter)
      } else if (operation === 'delete') {
        let index: number = -1
        recruiter.recruiterOf.forEach((jd, idx) => { if (jd.toString() === JD.toString()) index = idx })
        if (index < 0) throw new ServerError('Unable to delete, JD is not related with this recruiter', 'No se puede eliminar, la JD no esta relacionada a este administrador', 404)
        recruiter.recruiterOf.splice(index, 1)
        await Admin.findOneAndReplace({ _id: recruiterIds[i] }, recruiter)
      } else throw new ServerError('Invalid operation relating recruiter', 'Operacion invalida al relacionar reclutador', 406)
    }
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'Adding JD to recruiter', 'adicionar vacante a cada reclutador')
  }
}
