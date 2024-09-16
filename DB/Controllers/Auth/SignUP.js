import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Auth, DB, Storage } from '../../../FireBaseConfig.js'

export const SignUpController = async (req, res) => {
  const { email, password, Name } = req.body
  const image = req.file
  let imageUrl = ''
  if (image) {
    // Sanitize the email to be URL-friendly
    const sanitizedEmail = email.replace(/[^a-zA-Z0-9]/g, '_')
    const imagePath = `images/${sanitizedEmail}/${image.originalname}` // Directly use the path string
    const imageRef = ref(Storage, imagePath)
    const imageBuffer = image.buffer
    // Upload the image to Firebase Storage
    await uploadBytes(imageRef, imageBuffer)
    // Get the download URL for the image
    imageUrl = await getDownloadURL(imageRef)
  }

  try {
    // Check if the user already exists
    const userDocRef = doc(DB, 'USERS', email)
    const existingUser = await getDoc(userDocRef)

    if (existingUser.exists()) {
      // User already exists
      return res.status(400).json({ message: 'USER ALREADY EXISTS' })
    }

    // Create a new user with email and password
    const UserCredential = await createUserWithEmailAndPassword(
      Auth,
      email,
      password
    )

    // Check if UserCredential is successfully obtained
    if (UserCredential && UserCredential.user) {
      // Set user details in Firestore
      await setDoc(userDocRef, {
        Name,
        email,
        imageUrl,
        UserID: UserCredential.user.uid,
      })

      // Retrieve and return the user's data
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists()) {
        return res.status(201).json(userDoc.data())
      } else {
        return res
          .status(404)
          .json({ message: 'User data could not be retrieved' })
      }
    }

    // Handle case where UserCredential is not valid
    return res.status(400).json({ message: 'User registration failed' })
  } catch (error) {
    // Handle any errors during sign-up
    console.error('SignUp error:', error)
    return res
      .status(500)
      .json({ message: 'INTERNAL SERVER ERROR', details: error.message })
  }
}
