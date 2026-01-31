import { ObjectId } from 'mongodb'
import { blogsCollection } from '../../../db.js'
// GET all blogs (with pagination)
export const getBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
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
            author: 1,
            isDraft: 1,
            isArchived: 1,
          },
        },
      )
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    res.status(200).json(blogs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// GET single blog by titleLink
export const getSingleBlog = async (req, res) => {
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
}

// CREATE a new blog
export const createBlog = async (req, res) => {
  try {
    const blog = req.body
    const newBlog = {
      titleLink: blog.titleLink,
      title: blog.title,
      description: blog.description,
      author: blog.author,
      content: blog.content,
      image: blog.image,
      isDraft:
        blog.isDraft === true ||
        blog.isDraft === 'true' ||
        blog.isDraft === '1',
      isArchived:
        blog.isArchived === true ||
        blog.isArchived === 'true' ||
        blog.isArchived === '1',
      date: blog.date ? new Date(blog.date) : new Date(),
    }

    const result = await blogsCollection.insertOne(newBlog)
    res.status(201).json({ success: true, blogId: result.insertedId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

// UPDATE a blog by ID
export const updateBlog = async (req, res) => {
  try {
    const blogId = req.query
    const updates = req.body

    const updatedBlog = {}
    if (updates.titleLink) updatedBlog.titleLink = updates.titleLink
    if (updates.title) updatedBlog.title = updates.title
    if (updates.description) updatedBlog.description = updates.description
    if (updates.author) updatedBlog.author = updates.author
    if (updates.content) updatedBlog.content = updates.content
    if (updates.image) updatedBlog.image = updates.image
    if (updates.isDraft !== undefined)
      updatedBlog.isDraft =
        updates.isDraft === true ||
        updates.isDraft === 'true' ||
        updates.isDraft === '1'
    if (updates.isArchived !== undefined)
      updatedBlog.isArchived =
        updates.isArchived === true ||
        updates.isArchived === 'true' ||
        updates.isArchived === '1'
    if (updates.date) updatedBlog.date = new Date(updates.date)

    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(blogId) },
      { $set: updatedBlog },
    )

    if (result.matchedCount === 0)
      return res.status(404).json({ success: false, message: 'Blog not found' })

    res.status(200).json({ success: true, message: 'Blog updated' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

// DELETE a blog by ID
export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.query

    const result = await blogsCollection.deleteOne({
      _id: new ObjectId(blogId),
    })

    if (result.deletedCount === 0)
      return res.status(404).json({ success: false, message: 'Blog not found' })

    res.status(200).json({ success: true, message: 'Blog deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}
