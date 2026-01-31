import { MongoClient } from 'mongodb'
import fs from 'fs'
import csv from 'csv-parser'

// 🔐 MongoDB connection string
const uri =
  'mongodb+srv://octtoppus1:octtoppus1@octtoppusformbackend.uww4t69.mongodb.net/?appName=octtoppusformbackend'

// 🔹 Create Mongo client
const client = new MongoClient(uri)

async function importBlogs() {
  try {
    // 🔹 Connect to MongoDB
    await client.connect()
    console.log('✅ MongoDB connected')

    // 🔹 Use `test` database
    const db = client.db('test')
    const blogsCollection = db.collection('blogs')

    const blogs = []

    // 🔹 Read CSV file
    fs.createReadStream('./blog_posts.csv')
      .pipe(csv())
      .on('data', (row) => {
        blogs.push({
          _id: row.id || undefined, // keep CSV id
          titleLink: row.title_link,
          title: row.title,
          description: row.blog_description,
          author: row.blog_author,
          content: row.content,
          image: row.image_link,
          isDraft: row.draft_status === '1' || row.draft_status === 'true',
          isArchived:
            row.archive_status === '1' || row.archive_status === 'true',
          date: row.date ? new Date(row.date) : null,
          createdAt: new Date(),
        })
      })
      .on('end', async () => {
        if (blogs.length === 0) {
          console.log('⚠️ No blogs found in CSV')
          process.exit(0)
        }

        try {
          // 🔹 Insert all blogs, skip duplicates
          const result = await blogsCollection.insertMany(blogs, {
            ordered: false,
          })
          console.log(`✅ ${result.insertedCount} blogs inserted`)
        } catch (err) {
          if (err.code === 11000) {
            // Duplicate key error — ignore, other docs inserted
            console.log('⚠️ Some duplicate IDs skipped, other blogs inserted')
          } else {
            throw err
          }
        }

        await client.close()
        process.exit(0)
      })
  } catch (error) {
    console.error('❌ Error importing blogs:', error)
    await client.close()
    process.exit(1)
  }
}

// 🔹 Run import
importBlogs()
