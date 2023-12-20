import { type permissions, type AdminEntity } from '../../domain/admin/admin.entity'
import { type AdminRepository } from '../../domain/admin/admin.repository'
import { adminMailCreate } from '../../authentication/Infrastructure/nodemailer/verifyMail/adminMailCreate'
import { type MailNodeMailerProvider } from '../../authentication/Infrastructure/nodemailer/nodeMailer'
import { validateAdmin } from '../../../errors/validation'
import Admin from '../schema/Admin'
import { objectIDValidator } from '../helpers/validateObjectID'
import { ServerError, UncatchedError } from '../../../errors/errors'

export class MongoAdminRepository implements AdminRepository {
  constructor (private readonly mailNodeMailerProvider: MailNodeMailerProvider) {
    this.mailNodeMailerProvider = mailNodeMailerProvider
  }

  async createAdmin (admin: AdminEntity): Promise<AdminEntity> {
    try {
      await validateAdmin(admin)
      const adminCreated = await Admin.create(admin)
      await this.mailNodeMailerProvider.sendEmail(adminMailCreate(admin))
      return adminCreated
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating admin', 'crear administrador')
    }
  }

  async findAdmin (value: string, filter: string): Promise<AdminEntity | AdminEntity[]> {
    try {
      let result
      const validParams = ['email', 'active', 'country']
      if (filter === 'all') result = await Admin.find()
      else if (filter === 'id') {
        objectIDValidator(value, 'admin to search', 'admin buscado')
        result = await Admin.findById(value)
        if (!result) throw new ServerError('No admin found under that id', 'No se encontro administrador bajo ese ID', 404)
      } else if (filter === 'name') {
        const allAdmins = await Admin.find()
        const matchedAdmins: AdminEntity[] = []
        allAdmins.forEach(admin => {
          const fullName = admin.firstName + admin.lastName
          if (fullName.includes(value)) matchedAdmins.push(admin)
        })
        result = matchedAdmins
      } else if (validParams.includes(filter)) result = await Admin.find({ [filter]: value })
      else throw new ServerError('Not a valid parameter', 'Parametro invalido', 406)
      return result
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'searching admin', 'buscar administrador')
    }
  }

  async editAdmin (_id: string, info: any): Promise<AdminEntity> {
    try {
      objectIDValidator(_id, 'admin to edit', 'admin a editar')
      const invalidEdit = ['_id', 'role', 'createdDate', 'email', 'permissions']
      Object.keys(info).forEach(key => {
        if (invalidEdit.includes(key)) {
          throw new ServerError('ID/role/date/email and/or permissions cannot be changed or this is not the route for it',
            'El ID/rol/fecha/email y/o permisos no son editables o no se permite su cambio por esta ruta', 403)
        }
      })
      const editAdmin = await Admin.findByIdAndUpdate(_id, info, { new: true })
      if (!editAdmin) throw new ServerError('No admin found under that ID', 'No se encuentra admin bajo ese ID', 404)
      return editAdmin
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing admin', 'editar administrador')
    }
  }

  async deleteAdmin (_id: string, reqID?: string, total?: string): Promise<AdminEntity | string> {
    try {
      objectIDValidator(_id, 'admin to delete', 'admin a eliminar')
      const admin: AdminEntity | null = await Admin.findById(_id)
      let result: AdminEntity | null
      if (!admin) throw new ServerError('No admin found under that ID', 'No existe un admin con ese ID', 404)
      if (!total || total === 'false') {
        result = await Admin.findByIdAndUpdate(_id, { active: !admin.active }, { new: true }) as AdminEntity
        return result
      } else if (total === 'true') {
        if (reqID !== process.env.SUPERADM_ID) throw new ServerError('Only superadm can delete totally', 'El borrado total solo lo puede hcaer el super admin', 401)
        await Admin.findByIdAndDelete(_id)
      }
      return 'Admin totally deleted'
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting admin', 'eliminar administrador')
    }
  }

  async editPermissions (id: string, perm: permissions): Promise<AdminEntity> {
    try {
      objectIDValidator(id.toString(), 'admin to edit permissions', 'administrador a editar permisos')
      const admin = await Admin.findById(id)
      if (!admin) throw new ServerError('No admin found under that id', 'Administrador no encontrado bajo ese ID', 404)
      admin.permissions = { ...admin.permissions, ...perm }
      await Admin.findByIdAndUpdate(id, admin)
      return admin
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing admin permissions', 'editar permisos de administrador')
    }
  }
}
