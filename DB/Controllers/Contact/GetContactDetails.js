import { ContactModel } from '../../Model/Contact.js'

/**
 * @desc    Get all contact form submissions
 * @route   GET /api/contact
 * @access  Admin (or Public if you want)
 */
export const getContacts = async (req, res) => {
  try {
    // Fetch all contacts from DB
    const contacts = await ContactModel.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    console.error('Get Contacts Error:', error)

    res.status(500).json({
      success: false,
      message: 'Server error while fetching contacts',
    })
  }
}
