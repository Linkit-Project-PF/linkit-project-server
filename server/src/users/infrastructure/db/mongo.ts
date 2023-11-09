import mongoose from 'mongoose'
import 'dotenv/config'

// void (async () => {
//   try {
//     await mongoose.connect(`mongodb+srv://linkitprojecthenry:${process.env.MONGO_PASSWORD}@linkitdb.pruez4j.mongodb.net/?retryWrites=true&w=majority`)
//     console.log('MONGODB database connected')
//   } catch (error) {
//   }
// })()

export default async function mongoDBConnect (): Promise<void> {
  try {
    await mongoose.connect(`mongodb+srv://linkitprojecthenry:${process.env.MONGO_PASSWORD}@linkitdb.pruez4j.mongodb.net/?retryWrites=true&w=majority`)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connection to DB: ', error)
  }
}
