import { User } from '../../Model/User.js'

export const UpdateUser = async (req, res) => {
  console.log('Request body:', req.body)
  console.log('Uploaded file:', req.file)

  const { username, userID } = req.body
  const image = req.file ? req.file.path : null

  if (!username || !userID) {
    return res.status(400).json({ error: 'Username and userID are required' })
  }

  try {
    const user = await User.findById(userID)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.username = username
    if (image) user.image = image

    await user.save()
    res.status(200).json(user)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: error.message })
  }
}
