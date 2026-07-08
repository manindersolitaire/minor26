import mongoose from "mongoose"
import blogModel from "../models/blogModel.js"
import userModel from "../models/userModel.js"

export const createBlogController =  async (req,res)=>{
    try {
        const {title , description , image, user} = req.body

        // validation 
        if(!title || !description || !image ||!user){
            res.status(400).send({
                success : false,
                message : "Please fill all the fields"
            })
        }
        const existingUser =  await userModel.findById(user)
        if(!existingUser){
            return res.status(404).send({
                success : false,
                message : "User Not Found"
            })
        }
        const newBlog = await blogModel({title , description ,image, user})
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction()
        await newBlog.save()
        res.status(201).send({
            success : true,
            message : "Blog Created",
            newBlog
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in create blog controller"
        })
    }
}

// GET ALL BLOG
export const getAllBlogs = async(req,res)=>{
    try {
        const blogs = await blogModel.find({}).populate('user')
        return res.status(200).send({
            blogCount : blogs.length,
            success : true,
            message : "All Blogs",
            blogs
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message : 'Error in get blog Controller',
            error
        })
    }
}
// SINGLE BLOG
export const getSingleBlogController = async(req,res)=>{
    try{
        const {id} = req.params
        const blog =  await blogModel.findById(id)

        if(!blog){
            return res.status(400).send({
                success : false,
                message : 'blog not found with this id',
            })
        }
        return res.status(200).send({
            success : true,
            message : 'Single Blog',
            blog
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success : false,
            message : 'Error in get single blog Controller',
            error
        })
    }
} 
// UPDATE BLOG
export const updateBlogController = async(req,res)=>{
    try{
        const {id} = req.params
        const {title , description , image} = req.body
        const blog =  await blogModel.findByIdAndUpdate(id, {...req.body}, {new : true})

        return res.status(200).send({
            success : true,
            message : 'Blog Updated',
            blog
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success : false,
            message : 'Error in update blog Controller',
            error
        })
    }
} 

// DELETE BLOG
export const deleteBlogController = async(req,res)=>{
    try{
        const {id} = req.params
        const blog =  await blogModel.findByIdAndDelete(id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        return res.status(200).send({
            success : true,
            message : 'Blog Deleted',
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success : false,
            message : 'Error in delete blog Controller',
            error
        })
    }
} 
// USER BLOGS
export const userBlogController = async(req,res)=>{
    try {
        const userBlog =  await userModel.findById(req.params.id).populate('blogs')

        if(!userBlog){
            return res.status(404).send({
                success : false,
                message : "Blog not found with this user"
            })
        }
        return res.status(200).send({
            success : true,
            message : "User Blogs",
            userBlog
        })
    } catch (error) {
        return res.status(500).send({
            success : false,
            message : 'Error in user blog Controller',
            error
        })
    }
}


