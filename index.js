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
const corsOptions = {
  origin: '*', // Allow all origins; adjust in production for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only GET and POST
}
app.use(cors(corsOptions))
app.use(express.json()) // Parse JSON request bodies

// ------------------- ROUTES -------------------

app.use('/api/contact', Contactrouter)
app.use('/api/blogs', router)

// ------------------- START SERVER -------------------
app.listen(Port1, () => {
  console.log(`Server running on http://localhost:${Port1}`)
})
