import express from 'express'
import { Signin } from '../Controllers/Auth/Register.js'
import { upload } from '../Middleware/Multer.js'
import { Login } from '../Controllers/Auth/Login.js'
import { Signout } from '../Controllers/Auth/Signout.js'
import ResetPass from '../Controllers/Auth/ResetPass.js'
const AuthRouter = express.Router()
AuthRouter.post('/SignIn', upload.single('image'), Signin)
AuthRouter.post('/Login', Login)
AuthRouter.get('/SignOut', Signout)
AuthRouter.post('/Reset', ResetPass)
export default AuthRouter
