import { type Types } from 'mongoose'
import Company from '../../../../users/infrastructure/schema/Company'
import { ServerError, UncatchedError } from '../../../../errors/errors'

export default async function RelateJD (JD: Types.ObjectId, compID: string, operation: string): Promise<void> {
  try {
    const company = await Company.findById(compID)
    if (company) {
      if (operation === 'create') {
        company.jds.push(JD)
        await Company.findOneAndReplace({ _id: compID }, company)
      } else if (operation === 'delete') {
        let index: number = -1
        let existing: boolean = false
        company.jds.forEach((jd, idx) => {
          if (jd.toString() === JD.toString()) { existing = true; index = idx }
        })
        if (!existing || index < 0) throw new ServerError('Unable to delete, JD is not related with this company', 'No se puede eliminar, la JD no esta relacionada a esta empresa', 404)
        company.jds.splice(index, 1)
        await Company.findOneAndReplace({ _id: compID }, company)
      } else throw new ServerError('Not a valid operation to relateJD', 'Operacion invalida al relacionar vacante', 406)
    } else throw new ServerError('Company not found', 'Empresa no encontrada', 404)
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'Adding JD to company', 'adicionar vacante a empresa')
  }
}
