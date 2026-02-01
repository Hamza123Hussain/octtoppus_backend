import express from 'express'
import cors from 'cors'
import Contactrouter from './DB/Router/ContactRouter.js'
import router from './DB/Router/BlogRouter.js'
import { DB_CONNECTED } from './DBCoonect.js'

const app = express()

DB_CONNECTED()

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.use(express.json())

app.use('/api/contact', Contactrouter)
app.use('/api/blogs', router)

export default app
