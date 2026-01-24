import mongoose from 'mongoose'

/**
 * Contact Schema
 * Defines the structure of the contact form data in MongoDB
 */
const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      default: '',
    },

    companyType: {
      type: String,
      default: '',
    },

    services: {
      type: [String], // Array of services selected in frontend
      default: [],
    },

    message: {
      type: String,
      default: '',
    },

    captchaValue: {
      type: String, // Store captcha token if needed
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  },
)

// Export the model
export const ContactModel = mongoose.model('Contact', contactSchema)
