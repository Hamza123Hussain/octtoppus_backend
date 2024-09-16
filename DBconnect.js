import mongoose from 'mongoose'
import { Mongo } from './Config.js'

// Example using async/await for mongoose connection
export const connectDB = async () => {
  try {
    await mongoose.connect(Mongo)
    console.log('DB CONNECTED')
  } catch (error) {
    console.error('DB connection error:', error)
    process.exit(1) // Exit process with failure
  }
}
