import { MongoClient } from 'mongodb'

const client = new MongoClient(
  'mongodb+srv://octtoppus1:octtoppus1@octtoppuswebsite.pvcilq3.mongodb.net/'
) // Your MongoDB URI
await client.connect()

const db = client.db('blogDB') // replace with your DB name
const blogsCollection = db.collection('blogs')

export { blogsCollection }
