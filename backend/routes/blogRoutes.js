import express from 'express'
import { createBlogController, deleteBlogController, getAllBlogs, getSingleBlogController, updateBlogController, userBlogController } from '../controllers/blogController.js'

const blogRoutes =  express.Router()

// CREATE BLOG
blogRoutes.post('/createBlog', createBlogController)
// GET ALL BLOGS
blogRoutes.get('/allBlogs', getAllBlogs)
// SINGLE BLOG 
blogRoutes.get('/singleBlog/:id', getSingleBlogController)
// UPDATE BLOG
blogRoutes.put('/updateBlog/:id', updateBlogController)
// DELETE BLOG
blogRoutes.delete('/deleteBlog/:id', deleteBlogController)
// Users Blogs
blogRoutes.get('/userBlogs/:id', userBlogController)

export default blogRoutes