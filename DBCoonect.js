import mongoose from 'mongoose'

export const DB_CONNECTED = async () => {
  try {
    const data = await mongoose.connect(
      'mongodb+srv://octtoppus1:octtoppus1@octtoppuswebsite.pvcilq3.mongodb.net/',
    )
    if (data) console.log('DB CONNECTED')
  } catch (error) {
    console.log('DB ERROR', error)
  }
}
