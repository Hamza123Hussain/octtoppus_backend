// index.js
import express from 'express'
import cors from 'cors'
import { Port1 } from './Config.js'
import Contactrouter from './DB/Router/ContactRouter.js'
import { DB_CONNECTED } from './DBCoonect.js'
import router from './DB/Router/BlogRouter.js'
const app = express()

// ------------------- MIDDLEWARE -------------------
DB_CONNECTED()
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.options('*', cors()) // 👈 VERY IMPORTANT for Vercel

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// ------------------- ROUTES -------------------

app.use('/api/contact', Contactrouter)
app.use('/api/blogs', router)

// ------------------- START SERVER -------------------
app.listen(Port1, () => {
  console.log(`Server running on http://localhost:${Port1}`)
})
