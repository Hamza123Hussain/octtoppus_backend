import { collection, getDocs } from 'firebase/firestore'
import { DB } from '../../../FireBaseConfig.js'
export const GetAllBlogs = async (_, res) => {
  try {
    const querySnapshot = await getDocs(collection(DB, 'Blogs'))
    const posts = []
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() })
    })
    if (posts.length > 0) {
      return res.status(200).json(posts)
    } else {
      return res.status(404).json({ message: 'No data exists' })
    }
  } catch (error) {
    console.error('Error retrieving posts:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    })
  }
}
