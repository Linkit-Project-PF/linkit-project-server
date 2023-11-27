import { Schema, model } from 'mongoose'

const adminSchema = new Schema({
  image: {
    type: String,
    required: false,
    default: ''
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 3
  },
  country: {
    type: String,
    required: true,
    minlength: 2
  },
  role: {
    type: String,
    required: true,
    enum: ['admin']
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
})

export default model('Admin', adminSchema)
