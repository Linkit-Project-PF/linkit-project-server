import { Schema, model } from 'mongoose'

const adminSchema = new Schema({
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
  role: {
    type: String,
    required: true,
    enum: ['admin']
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  createdDate: {
    type: Date,
    default: Date()
  },
  recruiterOf: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Jd'
  },
  permissions: {
    type: {
      find: {
        type: [String],
        required: true,
        default: []
      },
      create: {
        type: [String],
        required: true,
        default: []
      },
      update: {
        type: [String],
        required: true,
        default: []
      },
      delete: {
        type: [String],
        required: true,
        default: []
      },
      special: {
        type: [String],
        required: true,
        default: []
      }
    },
    required: true
  }
})

export default model('Admin', adminSchema)
