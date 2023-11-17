import { randomUUID } from 'crypto'
import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: randomUUID()
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
    required: true,
    minlength: 5
  },
  country: {
    type: String,
    required: true,
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
  }
})

export default model('User', userSchema)
