// index.js
import express from 'express'
import cors from 'cors'
import { Port1 } from './Config.js'
import AuthRouter from './DB/Router/AuthRouter.js'
import BlogRouter from './DB/Router/BlogRouter.js'
import { blogsCollection } from './db.js'
import Contactrouter from './DB/Router/ContactRouter.js'
import { DB_CONNECTED } from './DBCoonect.js'
const app = express()

// ------------------- MIDDLEWARE -------------------
DB_CONNECTED()
const corsOptions = {
  origin: '*', // Allow all origins; adjust in production for security
  methods: ['GET', 'POST'], // Allow only GET and POST
}
app.use(cors(corsOptions))
app.use(express.json()) // Parse JSON request bodies

// ------------------- ROUTES -------------------

// Mount your existing routers
app.use('/api/auth', AuthRouter)
app.use('/api/blogs', BlogRouter)
app.use('/api/contact', Contactrouter)
// GET paginated list of blogs (metadata only)
app.get('/api/blogs', async (req, res) => {
  const page = parseInt(req.query.page) || 1 // default page 1
  const limit = parseInt(req.query.limit) || 10 // default 10 blogs per page
  const skip = (page - 1) * limit

  try {
    const blogs = await blogsCollection
      .find(
        {},
        {
          projection: {
            title: 1,
            image: 1,
            titleLink: 1,
            description: 1,

            date: 1,
            content: 1,
          }, // only required fields
        },
      )
      .sort({ date: -1 }) // sort by date descending
      .skip(skip)
      .limit(limit)
      .toArray()

    res.status(200).json(blogs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// GET single blog by ID
app.get('/api/singleblog', async (req, res) => {
  try {
    const blog = await blogsCollection.findOne({
      titleLink: req.query.titleLink,
    })
    if (!blog)
      return res.status(404).json({ success: false, message: 'Blog not found' })
    res.status(200).json(blog)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
})

// ------------------- START SERVER -------------------
app.listen(Port1, () => {
  console.log(`Server running on http://localhost:${Port1}`)
})
