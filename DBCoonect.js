import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
export const DB_CONNECTED = async () => {
  try {
    const data = await mongoose.connect(process.env.Mongo)
    if (data) console.log('DB CONNECTED')
  } catch (error) {
    console.log('DB ERROR', error)
  }
}
