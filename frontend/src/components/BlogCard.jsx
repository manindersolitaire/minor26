import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector } from "react-redux";

const BlogCard = ({
  id,
  title,
  description,
  image,
  username,
  time,
  userId,       // the blog author's _id
}) => {

  const navigate = useNavigate()
  const loggedInUserId = useSelector((state) => state.userId)

  const formattedDate = new Date(time).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const isAuthor = loggedInUserId && userId && loggedInUserId === userId

  const handleEdit = () => {
    navigate(`/postdetails/${id}`)
  }

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v2/blog/deleteBlog/${id}`)
      if (data.success) {
        toast.success('Post Deleted!')
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-sm w-full bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      {/* Blog Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">

        {/* Edit & Delete Icons — only visible to the post's author */}
        {isAuthor && (
          <div className="flex justify-end gap-3 mb-2">
            <button
              className="text-blue-600 hover:text-blue-800 text-lg transition cursor-pointer"
              title="Edit Blog"
              onClick={handleEdit}
            >
              <FaEdit />
            </button>

            <button
              className="text-red-600 hover:text-red-800 text-lg transition cursor-pointer"
              title="Delete Blog"
              onClick={handleDelete}
            >
              <FaTrash />
            </button>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-2">
          {description}
        </p>

        {/* Author & Date */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="font-medium text-indigo-600">
              {username}
            </p>
            <p className="text-xs text-gray-500">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;