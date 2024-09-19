import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { DB, Storage } from '../../../FireBaseConfig.js'
import { v4 as uuidv4 } from 'uuid'

export const AddNewBlog = async (req, res) => {
  const randomId = uuidv4()
  try {
    const { text, title, email, UserName, UserImage, conclusion, sections } =
      req.body
    const BlogImages = req.files['images']
    const headerImage = req.files['headerImage']?.[0]

    let BlogImageURLs = []
    let HeaderImageURL = ''

    // Upload header image
    if (headerImage) {
      const headerImagePath = `BLOGIMAGES/${email}/header_${headerImage.originalname}`
      const headerImageRef = ref(Storage, headerImagePath)
      const headerImageBuffer = headerImage.buffer
      await uploadBytes(headerImageRef, headerImageBuffer)
      HeaderImageURL = await getDownloadURL(headerImageRef)
    }

    // Upload blog images
    if (BlogImages && BlogImages.length > 0) {
      for (const image of BlogImages) {
        const imagePath = `BLOGIMAGES/${email}/${image.originalname}`
        const BlogImageRef = ref(Storage, imagePath)
        const imageBuffer = image.buffer
        await uploadBytes(BlogImageRef, imageBuffer)
        const BlogImageURL = await getDownloadURL(BlogImageRef)
        BlogImageURLs.push(BlogImageURL)
      }
    }

    // Parse sections array
    const parsedSections = JSON.parse(sections)

    // Save blog post data in Firestore
    const docRef = doc(DB, 'Blogs', randomId)
    await setDoc(docRef, {
      Title: title,
      CreatedBy: UserName,
      PostID: randomId,
      Text: text,
      Conclusion: conclusion,
      CreatedAt: Date.now(),
      UserImage,
      HeaderImageURL,
      BlogImageURLs,
      Sections: parsedSections, // Save sections array
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
