import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { DB, Storage } from '../../../FireBaseConfig.js'
import { v4 as uuidv4 } from 'uuid'

export const AddNewBlog = async (req, res) => {
  const randomId = uuidv4()
  try {
    const { text, title, email, UserName, UserImage, conclusion, sections } =
      req.body
    const headerImage = req.files['headerImage']?.[0] // Get the uploaded header image file
    let HeaderImageURL = ''
    let SectionData = []

    // Upload header image
    if (headerImage) {
      const headerImagePath = `BLOGIMAGES/${email}/header_${headerImage.originalname}`
      const headerImageRef = ref(Storage, headerImagePath)
      await uploadBytes(headerImageRef, headerImage.buffer) // Upload the image to Firebase Storage
      HeaderImageURL = await getDownloadURL(headerImageRef) // Get the URL of the uploaded image
    }

    // Parse sections and handle each section's image
    const parsedSections = JSON.parse(sections)
    for (let i = 0; i < parsedSections.length; i++) {
      const sectionImage = req.files[`sectionImage_${i}`]?.[0] // Get the section image
      let SectionImageURL = ''

      if (sectionImage) {
        const sectionImagePath = `BLOGIMAGES/${email}/section_${i}_${sectionImage.originalname}`
        const sectionImageRef = ref(Storage, sectionImagePath)
        await uploadBytes(sectionImageRef, sectionImage.buffer) // Upload section image
        SectionImageURL = await getDownloadURL(sectionImageRef) // Get URL of section image
      }

      // Add the section data including the image URL (if any)
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
      Sections: SectionData, // Save the sections with images
    })

    res
      .status(201)
      .json({ success: true, message: 'Blog post created successfully' })
  } catch (error) {
    console.error('Error adding post:', error)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    })
  }
}
