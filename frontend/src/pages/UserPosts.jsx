import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";

export default function UserPosts() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllBlogs = async() => {
    try {
      const id = localStorage.getItem('userId')
      const {data} = await axios.get(`/api/v2/blog/userBlogs/${id}`)
      if(data.success){
        setBlogs(data.userBlog.blogs)
        console.log(data.userBlog.blogs)
      } 
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getAllBlogs()
    
  }, [])

  return (
      <>
          <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          
              * {
                  font-family: 'Poppins', sans-serif;
              }
          `}</style>
          <h1 className="text-3xl font-semibold text-center mx-auto mt-5">Latest Blog</h1>
          <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
              Stay ahead of the curve with fresh content on code, design, startups, and everything in between.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 pt-12">
             {blogs.map((blog)=>{
              return <BlogCard
              id={blog._id}
              title = {blog.title}
              description = {blog.description}
              image = {blog.image}
              username = {blog.user?.username}
              time = {blog.createdAt}
              /> 
             })}
             
             
             
          </div>
      </>
  );
};
