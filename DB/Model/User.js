import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Define the user schema
const userSchema = new mongoose.Schema({
  _id: { type: String }, // Use String type for _id
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String }, // Field for storing image URL or path
})

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Use the correct 'this' context and check the password field
  if (!this.isModified('password')) return next()

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    console.log('ERROR:', error)
    next(error) // Pass the error to the next middleware
  }
})

// Create the model
export const User = mongoose.model('User', userSchema)
