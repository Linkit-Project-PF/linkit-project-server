//* interface => de propiedades que son importantes para el negocio

export interface UserEntity {
  uuid: string;
  username: string;
  password: string; //* Important to decide If we keep It, otherwise we need to create another interface */
  email: string;
  role: string;
}
