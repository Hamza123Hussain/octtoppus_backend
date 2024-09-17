import { Router } from 'express'
import { AddNewBlog } from '../Controllers/Blog/AddBlog.js'
import { upload } from '../../multerconfig.js'
import { GetAllBlogs } from '../Controllers/Blog/GettingAll.js'
import { UpdateBlog } from '../Controllers/Blog/UpdateBlog.js'
const BlogRouter = Router()
BlogRouter.post('/UpdateBlog', UpdateBlog)
BlogRouter.get('/GetAll', GetAllBlogs)
BlogRouter.post('/AddBlog', upload.single('image'), AddNewBlog)

export default BlogRouter
