import { Schema, model } from 'mongoose'

const OKRsSchema = new Schema({
  generalTitleOKR: {
    type: String,
    required: true
  },
  areas: [{
    name: {
      type: String,
      required: true
    },
    specificOKRsArea: [{
      okrSpecificName: {
        type: String,
        required: true
      },
      okrsSpecific: {
        type: [String],
        required: false
      }
    }]
  }],
  archived: {
    type: Boolean,
    required: true,
    default: false
  }
})

export default model('OKRs', OKRsSchema)
