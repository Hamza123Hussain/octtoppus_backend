import { DB } from '../../../FireBaseConfig.js'

export const GetSingleBlog = async (req, res) => {
  const { id } = req.query

  try {
    const blogRef = DB.collection('Blogs').doc(id)
    const blogDoc = await blogRef.get()

    if (!blogDoc.exists) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    res.status(200).json({ id: blogDoc.id, ...blogDoc.data() })
  } catch (error) {
    console.error('Error retrieving blog:', error)
    res.status(500).json({ message: 'Error retrieving blog' })
  }
}
