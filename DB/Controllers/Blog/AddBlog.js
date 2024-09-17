import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { DB, Storage } from '../../../FireBaseConfig.js'
import { v4 as uuidv4 } from 'uuid'
export const AddNewBlog = async (req, res) => {
  const randomId = uuidv4()
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
    const docRef = doc(DB, 'Blogs', randomId)
    await setDoc(docRef, {
      Title: title,
      CreatedBy: UserName,
      UserName: Name,
      PostID: randomId,
      Text: text,
      comments: [],
      CreatedAt: Date.now(),
      UserImage,
      BlogImageURL: BlogImageURL || '',
    })
    res.status(201).json(true)
  } catch (error) {
    console.error('Error adding post:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    })
  }
}
