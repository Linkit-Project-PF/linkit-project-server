import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  airTableId: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false,
    minlength: 3
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  phone: {
    type: String,
    required: false,
    minlength: 5
  },
  country: {
    type: String,
    required: false,
    minlength: 2
  },
  linkedin: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 30
  },
  cv: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 30
  },
  role: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    enum: ['user']
  },
  technologies: {
    type: Array,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  postulations: {
    type: Array,
    required: true,
    minlength: 0
  },
  userStatus: {
    type: String,
    minlength: 0,
    required: false
  },
  internStatus: {
    type: String,
    required: false,
    minlength: 0,
    enum: ['Descartado', 'Contratado', 'Descartado x el cliente', 'Desistió', 'Presentado al cliente', 'Listo para presentar', 'Sourced', 'No contactar - Blacklist', 'Candidato para backup', 'listo para segunda entrevista de cliente/test técnico', 'Ofertado']
  }
})

export default model('User', userSchema)
