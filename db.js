import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()
const client = new MongoClient(process.env.Mongo) // Your MongoDB URI
await client.connect()

const db = client.db('test') // replace with your DB name
const blogsCollection = db.collection('blogs')

export { blogsCollection }
