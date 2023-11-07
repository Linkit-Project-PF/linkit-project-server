//* interface => de propiedades que son importantes para el negocio

export interface UserEntity {
  uuid: string
  username: string
  password: string
  email: string
  role: string
  permissions: string[]
}
