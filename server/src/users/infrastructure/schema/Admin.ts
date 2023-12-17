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
    find: {
      type: [String],
      required: false,
      default: []
    },
    create: {
      type: [String],
      required: false,
      default: []
    },
    update: {
      type: [String],
      required: false,
      default: []
    },
    delete: {
      type: [String],
      required: false,
      default: []
    },
    special: {
      type: [String],
      required: false,
      default: []
    }
  }
})

export default model('Admin', adminSchema)
