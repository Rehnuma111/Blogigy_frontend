import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';





const RecentBlog = ({ blogs }) => {

    const { theme } = useSelector((state) => state.themeSliceApp);
    const recentBlogs = blogs;



    return (
        <>
            <Link
                to={`/blog/${recentBlogs.slug}`}
                className={`group block w-full max-w-xs mx-auto bg-white dark:bg-gray-900 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-400`}
                style={{ minWidth: '220px' }}
            >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                        src={recentBlogs.blogImgFile}
                        alt={recentBlogs.blogTitle}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="flex flex-col gap-2 px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${theme === 'dark' ? 'bg-gray-800 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>{recentBlogs.blogCategory}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(recentBlogs.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white truncate" title={recentBlogs.blogTitle}>
                        {recentBlogs.blogTitle}
                    </h3>
                    <button className="mt-2 w-fit px-3 py-1 text-xs font-semibold rounded-full bg-orange-500 text-white shadow hover:bg-orange-600 transition-all">Read More</button>
                </div>
            </Link>
        </>
    )
}

export default RecentBlog;