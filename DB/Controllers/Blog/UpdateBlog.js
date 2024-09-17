import { doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { DB, Storage } from '../../../FireBaseConfig.js'
export const UpdateBlog = async (req, res) => {
  const { id } = req.query // Assuming the blog ID is passed as a URL parameter
  try {
    const { text, Name, title, email, UserName, UserImage } = req.body
    const BlogImage = req.file
    let BlogImageURL = ''
    if (BlogImage) {
      const imagePath = `BLOGIMAGES/${email}/${BlogImage.originalname}`
      const BlogImageRef = ref(Storage, imagePath)
      const imageBuffer = BlogImage.buffer
      await uploadBytes(BlogImageRef, imageBuffer)
      BlogImageURL = await getDownloadURL(BlogImageRef)
    }
    const docRef = doc(DB, 'Blogs', id) // Use the provided blog ID to find the document
    await updateDoc(docRef, {
      Title: title,
      CreatedBy: UserName,
      UserName: Name,
      Text: text,
      UpdatedAt: Date.now(), // Track when the blog was updated
      UserImage,
      BlogImageURL: BlogImageURL || '',
    })
    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error updating post:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    })
  }
}
