import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../assests/spinner/Spinner";
import DashboardSidebar from "../components/DashboardSidebar";

const Home = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const { theme } = useSelector((state) => state.themeSliceApp);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blog/get-all-blogs?limit=9`);
        if (response.status === 200) {
          setRecentBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };
    getAllBlogs();
  }, []);

  return (
    <div className="pt-32 px-5 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      
      <div className="flex flex-col items-start gap-6 mb-20 max-w-3xl mx-auto text-center md:text-left">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-yellow-300"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Explore Insightful Web Content
        </motion.h1>

        <motion.p
          className="text-base md:text-lg leading-7 text-gray-700 dark:text-gray-300"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Welcome to our digital library of tutorials, guides, and coding
          updates. This is a space curated for curious minds, developers, and
          learners seeking modern web knowledge — from development practices to
          deployment strategies.
        </motion.p>

        <Link
          to="/blog"
          className="self-center md:self-start inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300"
        >
          View All Blogs
        </Link>
      </div>

      {/* Blog Tags */}
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        <TextTag title="Dev Tips" />
        <TextTag title="Frontend" />
        <TextTag title="Backend" />
        <TextTag title="Testing" />
        <TextTag title="Deployment" />
        <TextTag title="Best Practices" />
      </div>

      {/* Recent Blogs */}
      <h2 className="text-3xl font-bold text-center mb-10">
        Latest from the Blog
      </h2>

      {loading ? (
        <div className="flex justify-center my-10">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {recentBlogs.map((blog, index) => (
            <div
              key={index}
              className={`max-w-sm w-full border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform hover:scale-[1.01] duration-300 
                ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"}`}
            >
              <Link to={`/blog/${blog.slug}`}>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {blog.blogTitle}
                  </h3>
                  <span className="inline-block text-xs bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 px-3 py-1 rounded-full">
                    {blog.blogCategory}
                  </span>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                    {blog.blogDescription?.slice(0, 100)}...
                  </p>
                  <span className="block mt-2 text-sm text-blue-500 dark:text-blue-300 hover:underline">
                    Read More →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Tag Component with dark/light mode compatibility
const TextTag = ({ title }) => (
  <div className="px-4 py-2 rounded-full border text-sm font-medium text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600">
    {title}
  </div>
);

export default Home;
