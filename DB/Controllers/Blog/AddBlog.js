import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { DB, Storage } from '../../../FireBaseConfig.js'
import { v4 as uuidv4 } from 'uuid'

export const AddNewBlog = async (req, res) => {
  const randomId = uuidv4()
  try {
    const { text, title, email, UserName, UserImage } = req.body
    const BlogImages = req.files // Get the array of files (images)

    // Array to store URLs of uploaded images
    let BlogImageURLs = []

    // Loop through each uploaded image, upload to Firebase, and get the download URL
    if (BlogImages && BlogImages.length > 0) {
      for (const image of BlogImages) {
        const imagePath = `BLOGIMAGES/${email}/${image.originalname}`
        const BlogImageRef = ref(Storage, imagePath)
        const imageBuffer = image.buffer
        await uploadBytes(BlogImageRef, imageBuffer)
        const BlogImageURL = await getDownloadURL(BlogImageRef)
        BlogImageURLs.push(BlogImageURL) // Add the URL to the array
      }
    }

    // Save blog post data in Firestore, including the array of image URLs
    const docRef = doc(DB, 'Blogs', randomId)
    await setDoc(docRef, {
      Title: title,
      CreatedBy: UserName,
      PostID: randomId,
      Text: text,
      comments: [],
      CreatedAt: Date.now(),
      UserImage,
      BlogImageURLs, // Save array of URLs
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
