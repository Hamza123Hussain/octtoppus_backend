import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Storage } from '../../../FireBaseConfig.js'

export const uploadVideo = async (req, res) => {
  try {
    const videoFile = req.file // Assuming you're using middleware like multer to handle file uploads

    if (!videoFile) {
      return res
        .status(400)
        .json({ success: false, message: 'No video file provided.' })
    }

    const { email } = req.body // Get email or any other relevant data you might need
    const videoPath = `VIDEOS/${email}/${videoFile.originalname}` // Path to save the video in Firebase Storage
    const videoRef = ref(Storage, videoPath)

    // Upload the video file to Firebase Storage
    await uploadBytes(videoRef, videoFile.buffer)

    // Get the download URL of the uploaded video
    const videoURL = await getDownloadURL(videoRef)

    // Return the video URL in the response
    res.status(200).json(videoURL)
  } catch (error) {
    console.error('Error uploading video:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}
