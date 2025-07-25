import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchAllBlogsURL } from '../api/url';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import BlogLoader from '../assests/blogSpinner/BlogLoader';

const ViewAllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(fetchAllBlogsURL);
        if (response.status === 200) {
          setBlogs(response.data.blogs || []);
        } else {
          toast.error('Failed to fetch blogs.');
        }
      } catch (error) {
        toast.error('An unexpected error occurred!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getAllBlogs();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      {loading ? (
        <div className="text-center py-8"><BlogLoader/></div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No blogs found.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {blogs.map(blog => (
            <Link
              to={`/blog/${blog.slug}`}
              key={blog._id}
              className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800 block hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {blog.blogImgFile && (
                <img
                  src={blog.blogImgFile}
                  alt={blog.blogTitle}
                  className="w-full h-40 object-cover rounded mb-3"
                  loading="lazy"
                />
              )}
              <h3 className="text-lg font-semibold mb-2">{blog.blogTitle}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{blog.blogDescription?.slice(0, 100)}...</p>
              <div className="text-xs text-gray-400">By: {blog.username || blog.authorName || 'Unknown'}</div>
              <div className="text-xs text-gray-400">Category: {blog.blogCategory || 'N/A'}</div>
              <div className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllBlog;

