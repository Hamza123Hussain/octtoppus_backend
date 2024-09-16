import { verifyToken } from '../../JsonWebToken.js'

// Middleware function to authenticate JWT token
export const authenticateToken = (req, res, next) => {
  // Extract the 'Authorization' header from the request headers
  const authHeader = req.headers['authorization']

  // If the header exists, split it and get the token part
  // Typically the header value is in the format 'Bearer <token>'
  const token = authHeader && authHeader.split(' ')[1]

  // Check if the token is missing
  // Respond with a 401 Unauthorized status if no token is provided
  if (token == null) return res.status(401).send('Token missing')

  try {
    // Verify and decode the token using the verifyToken function
    // This function should throw an error if the token is invalid or expired
    const user = verifyToken(token)

    // Attach the decoded user information to the request object
    // This allows other middleware or route handlers to access user details
    req.user = user

    // Call the next middleware or route handler
    next()
  } catch (error) {
    // Handle errors if token verification fails
    // Respond with a 403 Forbidden status if the token is invalid
    res.status(403).send('Token invalid')
  }
}
