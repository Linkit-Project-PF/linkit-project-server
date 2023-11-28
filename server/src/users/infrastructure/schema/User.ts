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
    enum: ['low', 'medium', 'high', 'bilingual', ''],
    default: ''
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
    required: true
  },
  registeredDate: {
    type: Date,
    default: Date()
  }
})

export default model('User', userSchema)
