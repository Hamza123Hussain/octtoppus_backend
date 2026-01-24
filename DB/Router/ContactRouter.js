import express from 'express'
import { storeContact } from '../Controllers/Contact/AddContactDetails.js'
import { getContacts } from '../Controllers/Contact/GetContactDetails.js'

const Contactrouter = express.Router()

/**
 * POST - Store contact form data
 */
Contactrouter.post('/contact', storeContact)

/**
 * GET - Fetch all contact submissions
 */
Contactrouter.get('/contact', getContacts)

export default Contactrouter
