import { User } from '../../Model/User.js'
export const GettingUser = async (req, res) => {
  try {
    const { userID } = req.query // Retrieve userID from query parameters
    // Ensure the userID is provided
    if (!userID) {
      return res.status(400).json({ message: 'User ID is required' })
    }
    // Fetch user data from the database
    const userData = await User.findById(userID)
    // If no user found, send 404 error
    if (!userData) {
      return res.status(404).json({ message: 'User not found' })
    }
    // Return user data if found
    return res.status(200).json(userData)
  } catch (error) {
    // Catch any error and send a 500 server error response
    console.error('Error fetching user data:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
