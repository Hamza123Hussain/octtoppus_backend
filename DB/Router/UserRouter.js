import express from 'express'
import { GettingUser } from '../Controllers/User/GettingUserDetails.js'
import { upload } from '../Middleware/Multer.js'
import { UpdateUser } from '../Controllers/User/UpdateUser.js'
const UserRouter = express.Router()
UserRouter.get('/GetUser', GettingUser)
/**sending userID as a query */
UserRouter.post('/UpdateUser', upload.single('image'), UpdateUser)
export default UserRouter
