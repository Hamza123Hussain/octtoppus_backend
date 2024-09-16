// multer-config.js
import multer from 'multer'

const storage = multer.memoryStorage() // Use memory storage for file uploads
export const upload = multer({ storage })
