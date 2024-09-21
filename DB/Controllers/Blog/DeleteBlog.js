import { deleteDoc, doc } from 'firebase/firestore'
import { DB } from '../../../FireBaseConfig.js'

export const DeleteBlog = async (req, res) => {
  const { id } = req.query

  try {
    await deleteDoc(doc(DB, 'Blogs', id))

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error deleting blog:', error)
    res.status(500).json({ message: 'Error deleting blog' })
  }
}
