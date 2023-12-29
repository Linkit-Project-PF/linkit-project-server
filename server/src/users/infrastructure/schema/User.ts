import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  firebaseId: {
    type: String,
    required: false,
    default: ''
  },
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
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Invalid email address format'
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
    enum: ['low', 'medium', 'high', 'bilingual', ''],
    default: ''
  },
  role: {
    type: String,
    required: true,
    enum: ['user']
  },
  technologies: {
    type: [String],
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  registeredDate: {
    type: Date,
    default: Date()
  },
  postulations: {
    type: [String],
    required: true
  }
})

export default model('User', userSchema)
