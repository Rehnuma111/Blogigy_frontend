import axios from "axios";
import { fetchBlogBySlugURL, fetchAllBlogsWithLimitURL } from "../api/url";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogLoader from "../assests/blogSpinner/BlogLoader";
import { MdUpdate } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import CommentCard from "../components/CommentCard";
import RecentBlog from "../components/RecentBlog";

const ShowBlog = () => {
  const { theme } = useSelector((state) => state.themeSliceApp);

  const [slug, setSlug] = useState();
  const { blogSlug } = useParams();
  const [loader, setLoader] = useState(false);
  const [limitBlogs, setLimitBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogSlug = async () => {
      try {
        setLoader(true);
        const fetchSlug = await axios.get(fetchBlogBySlugURL(blogSlug));
        const response = fetchSlug;
        setLoader(false);

        if (response.status === 200) {
          const getSlug = response.data.blogs[0];
          setSlug(getSlug);
        }
      } catch (error) {
        setLoader(false);
        console.log(error.message);
      }
    };
    fetchBlogSlug();
  }, [blogSlug]);

  useEffect(() => {
    const getLimitBlogs = async () => {
      try {
        const getBlogs = await axios.get(fetchAllBlogsWithLimitURL(3));

        if (getBlogs.status === 200) {
          setLimitBlogs(getBlogs.data.blogs);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getLimitBlogs();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
        {loader ? (
          <BlogLoader />
        ) : (
          <>
            {slug && (
              <div className="pt-10 max-w-3xl w-full mx-auto px-4">
                {/* Blog Header */}
                <div className="mb-8 flex flex-col items-center gap-2">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white leading-tight mb-2 hover:scale-105 transition-transform cursor-pointer">
                    {slug.slug}
                  </h1>
                  <div className="flex flex-wrap gap-3 justify-center items-center text-sm md:text-base">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full border border-orange-400 bg-orange-50 dark:bg-gray-800 text-orange-500 font-semibold shadow-sm cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-700 transition">
                      <BiCategoryAlt size={18} />
                      {slug.blogCategory}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
                      <MdDateRange size={18} />
                      {new Date(slug.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
                      <MdUpdate size={18} />
                      {(slug.blogBody.length / 1000).toFixed(0)} min read
                    </span>
                  </div>
                </div>

                {/* Blog Image */}
                <div className="flex justify-center mb-8">
                  <img
                    src={slug.blogImgFile}
                    className="rounded-xl shadow-lg object-cover max-h-96 w-full border border-gray-200 dark:border-gray-700"
                    alt="blog image"
                  />
                </div>

                {/* Blog Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 mb-10 shadow-md transition-colors duration-500">
                  <div
                    dangerouslySetInnerHTML={{ __html: slug.blogBody }}
                  ></div>
                </div>

                {/* Comments Section */}
                <div className="bg-orange-50 dark:bg-gray-800 rounded-xl p-6 mb-10 shadow-md w-full">
                  <h2 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-400">Comments</h2>
                  <CommentCard blogId={slug._id} />
                </div>

                {/* Recent Blogs Section */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Recent Blogs</h2>
                  <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
                    {limitBlogs &&
                      limitBlogs.map((value, index) => (
                        <div key={index} className="flex">
                          <RecentBlog blogs={value} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ShowBlog;
