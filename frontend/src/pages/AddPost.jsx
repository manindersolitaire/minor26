import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const navigate =  useNavigate()
  const id =  localStorage.getItem('userId')
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) =>{
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const {data} = await axios.post('/api/v2/blog/createBlog',{
            title : formData.title,
            description : formData.description,
            image : formData.image,
            user : id
        })

        if(data.success){
            toast.success('Post Uploaded')
            navigate('/')
        }
    } catch (error) {
        console.log(error)
    }
  }

  

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Add New Blog
        </h2>

        {/* Title */}
        <label className="block font-medium mb-2">
          Blog Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter blog title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        {/* Description */}
        <label className="block font-medium mb-2">
          Description
        </label>
        <textarea
          rows="5"
          name="description"
          placeholder="Write your blog description..."
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        {/* Image Upload */}
        <label className="block font-medium mb-2">
          Upload Image
        </label>

        <input
          type="text"
          name="image"
          placeholder="Enter blog title"
          value={formData.image}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}