import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  airTableId: {
    type: String,
    required: false,
    default: ''
  },
  image: {
    type: String,
    required: false,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  country: {
    type: String,
    required: false,
    default: ''
  },
  linkedin: {
    type: String,
    required: false,
    default: ''
  },
  cv: {
    type: String,
    required: false,
    default: ''
  },
  englishLevel: {
    type: String,
    required: false,
    enum: ['low', 'medium', 'high', 'bilignual']
  },
  role: {
    type: String,
    required: true,
    enum: ['user']
  },
  technologies: {
    type: Array,
    required: true
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
  }
  // TODO This should be a separated entity when relations are created. State is not static for each user.
  // userStatus: {
  //   type: String,
  //   minlength: 0,
  //   required: false
  // },
  // internStatus: {
  //   type: String,
  //   required: false,
  //   minlength: 0,
  //   enum: ['Descartado', 'Contratado', 'Descartado x el cliente', 'Desistió', 'Presentado al cliente', 'Listo para presentar', 'Sourced', 'No contactar - Blacklist', 'Candidato para backup', 'listo para segunda entrevista de cliente/test técnico', 'Ofertado']
  // }
})

export default model('User', userSchema)
