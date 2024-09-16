import express from 'express'

import { SignUpController } from '../Controllers/Auth/SignUP.js'
import { LoginController } from '../Controllers/Auth/Login.js'
import { SignOutController } from '../Controllers/Auth/Signout.js'
import ResetPass from '../Controllers/Auth/ResetPass.js'
import { upload } from '../../multerconfig.js'
const AuthRouter = express.Router()
AuthRouter.post('/register', upload.single('image'), SignUpController)
AuthRouter.post('/Login', LoginController)
AuthRouter.get('/SignOut', SignOutController)
AuthRouter.post('/Reset', ResetPass)
export default AuthRouter
