import express from 'express'
import {
  createBlog,
  deleteBlog,
  getallBlogs,
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

router.get('/getallblogs', getallBlogs)

export default router
