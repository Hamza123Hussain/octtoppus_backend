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
    let SectionImageURLs = []

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

    // Parse sections array and handle section images
    const parsedSections = JSON.parse(sections)
    const SectionData = []
    for (let i = 0; i < parsedSections.length; i++) {
      const sectionImage = req.files[`sectionImage_${i}`]?.[0]
      let SectionImageURL = ''
      if (sectionImage) {
        const sectionImagePath = `BLOGIMAGES/${email}/section_${i}_${sectionImage.originalname}`
        const sectionImageRef = ref(Storage, sectionImagePath)
        const sectionImageBuffer = sectionImage.buffer
        await uploadBytes(sectionImageRef, sectionImageBuffer)
        SectionImageURL = await getDownloadURL(sectionImageRef)
      }

      SectionData.push({
        title: parsedSections[i].title,
        text: parsedSections[i].text,
        image: SectionImageURL,
      })
    }

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
      HeaderImageURL, // Save header image URL
      BlogImageURLs, // Save array of URLs for other images
      Sections: SectionData, // Save array of sections with images
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
