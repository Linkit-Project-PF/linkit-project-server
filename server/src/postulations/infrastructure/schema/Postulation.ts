import { Schema, model } from 'mongoose'

const postulationSchema = new Schema({
  reason: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true,
    enum: ['now', 'one-month', 'negotiate']
  },
  salary: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return value > 0 && value < 1000000
      },
      message: 'Not valid number for salary expectation'
    }
  },
  techStack: {
    type: [String],
    required: true,
    default: []
  },
  stack: {
    type: [String],
    required: true,
    default: []
  },
  jd: {
    type: Schema.Types.ObjectId,
    ref: 'Jd',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  followUps: {
    type: [Schema.Types.ObjectId],
    ref: 'Admin',
    required: true
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date()
  }
})
export default model('Postulation', postulationSchema)
