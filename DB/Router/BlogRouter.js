import express from 'express'
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from '../Controllers/Blog/AllInController.js'

const router = express.Router()

router.get('/', getBlogs)
router.get('/single', getSingleBlog)
router.post('/', createBlog)
router.put('/updateblog', updateBlog)
router.delete('/deleteblog', deleteBlog)

export default router
