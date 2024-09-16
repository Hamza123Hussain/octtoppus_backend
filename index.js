import express from 'express' // Import Express framework
import cors from 'cors' // Import CORS middleware
import { Port1 } from './Config.js' // Import port number from the configuration file
import AuthRouter from './DB/Router/AuthRouter.js' // Import authentication routes

const app = express()
const corsOptions = {
  origin: '*', // Allow requests from any origin; adjust as needed for security
  methods: ['GET', 'POST'], // Allow only GET and POST methods
}
app.use(cors(corsOptions)) // Use CORS middleware with the defined options
app.use(express.json()) // Middleware to parse JSON request bodies

// Use authentication routes
app.use('/API/AUTH', AuthRouter) // Mount the authentication router on the '/API/AUTH' path

// // Connect to the database
// connectDB() // Establish a connection to the database

app.listen(Port1, () => {
  console.log(`App and WebSocket server running on http://localhost:${Port1}`) // Log that the server is running
})
