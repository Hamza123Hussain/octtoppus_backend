import { MongoClient } from 'mongodb'
import fs from 'fs'
const blogs = JSON.parse(fs.readFileSync('./blog_posts.json', 'utf-8'))

async function run() {
  const client = new MongoClient(
    'mongodb+srv://octtoppus1:octtoppus1@octtoppuswebsite.pvcilq3.mongodb.net/'
  )
  await client.connect()
  const db = client.db('blogDB')
  const collection = db.collection('blogs')

  for (const blog of blogs) {
    await collection.insertOne({
      _id: blog.id || undefined,
      titleLink: blog.title_link,
      title: blog.title,
      description: blog.blog_description,
      author: blog.blog_author,
      content: blog.content,
      image: blog.image_link,
      isDraft: blog.draft_status === '1' || blog.draft_status === 'true',
      isArchived: blog.archive_status === '1' || blog.archive_status === 'true',
      date: new Date(blog.date),
    })
    console.log('Imported:', blog.title)
  }

  await client.close()
}

run()
