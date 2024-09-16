import jwt from 'jsonwebtoken'
import { JsonWebToken } from './Config.js'
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JsonWebToken, { expiresIn: '6h' })
}

// Verify a JWT token
export const verifyToken = (token) => {
  return jwt.verify(token, JsonWebToken)
}
