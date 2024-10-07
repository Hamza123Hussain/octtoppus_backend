import { Router } from 'express'
import { AddNewBlog } from '../Controllers/Blog/AddBlog.js'
import { upload } from '../../multerconfig.js'
import { GetAllBlogs } from '../Controllers/Blog/GettingAll.js'
import { UpdateBlog } from '../Controllers/Blog/UpdateBlog.js'
import { GetSingleBlog } from '../Controllers/Blog/GetSingle.js'
import { DeleteBlog } from '../Controllers/Blog/DeleteBlog.js'
import { uploadVideo } from '../Controllers/Blog/UploadVideo.js'

const BlogRouter = Router()

// Route for updating an existing blog
BlogRouter.post('/UpdateBlog', UpdateBlog)

// Route to get all blogs
BlogRouter.get('/GetAll', GetAllBlogs)

// Route to add a new blog post with header and section images
BlogRouter.post(
  '/AddBlog',
  upload.fields([
    { name: 'headerImage', maxCount: 1 }, // Allow 1 header image
    ...Array.from({ length: 10 }, (_, i) => ({
      name: `sectionImage_${i}`,
      maxCount: 1, // Allow 1 section image per section
    })),
  ]),
  AddNewBlog
)

BlogRouter.get('/GetSingle', GetSingleBlog)
BlogRouter.delete('/DeleteBlog', DeleteBlog)
BlogRouter.post('/UploadImage', upload.single('video'), uploadVideo)

export default BlogRouter
