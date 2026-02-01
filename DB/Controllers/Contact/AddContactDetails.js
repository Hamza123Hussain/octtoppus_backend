import { ContactModel } from '../../Model/Contact.js'

/**
 * @desc    Store contact form data
 * @route   POST /api/contact
 * @access  Public
 */
export const storeContact = async (req, res) => {
  try {
    // Destructure data coming from frontend
    const {
      fullName,
      email,
      phoneNumber,
      company,
      companyType,
      services,
      message,
    } = req.body

    // Basic validation
    if (!fullName || !email || !phoneNumber || !captchaValue) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing',
      })
    }

    // Create new contact document
    const contact = new ContactModel({
      fullName,
      email,
      phoneNumber,
      company,
      companyType,
      services,
      message,
  
    })

    // Save to MongoDB
    await contact.save()

    // Success response
    res.status(201).json({
      success: true,
      message: 'Contact details saved successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Store Contact Error:', error)

    res.status(500).json({
      success: false,
      message: 'Server error while saving contact',
    })
  }
}
