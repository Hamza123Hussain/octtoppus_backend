import { DB } from '../../../FireBaseConfig.js'

export const DeleteBlog = async (req, res) => {
  const { id } = req.params

  try {
    const blogRef = DB.collection('Blogs').doc(id)
    await blogRef.delete()
    res.status(200).json(true)
  } catch (error) {
    console.error('Error deleting blog:', error)
    res.status(500).json({ message: 'Error deleting blog' })
  }
}
