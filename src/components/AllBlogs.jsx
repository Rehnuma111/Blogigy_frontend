import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// Removed flowbite-react Table import
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BlogPopupModal from "./BlogPopupModal";
import BlogLoader from "../assests/blogSpinner/BlogLoader";
import { fetchAllBlogsByUserURL, fetchAllBlogsByPageURL } from '../api/url';
import { PiSmileySad } from "react-icons/pi";

const AllBlogs = () => {
    const { user } = useSelector((state) => state.userSliceApp);
    const { theme } = useSelector((state) => state.themeSliceApp);
    const [userBlogs, setUserBlogs] = useState([]);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [blogModal, setBlogModal] = useState(false);
    const [blogId, setBlogId] = useState("");
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(2);

    // Get blogs fetch api :
    useEffect(() => {
        if (user.isAdmin) {
            const getBlogs = async () => {
                setLoader(true);
                try {
                    const fetchBlogs = await axios.get(fetchAllBlogsByUserURL(user._id));

                    if (fetchBlogs.status === 200) {
                        setLoader(false);
                        setUserBlogs(fetchBlogs.data.blogs);

                        if (fetchBlogs.data.blogs) {
                            if (fetchBlogs.data.blogs.length > 5) {
                                setShowMoreButton(true);
                            } else {
                                setShowMoreButton(false);
                            }
                        }
                    }
                } catch (error) {
                    setLoader(false);
                    toast.error("An unexpected error occurred!");
                    console.log(error);
                }
            };
            getBlogs();
        }
    }, [user._id]);

    const deleteBlogHandle = (id) => {
        setBlogId(id);
        setBlogModal(true);
    };

    // Show More button api :
    const fetchBlogs = async (page = 2) => {
        try {
            const response = await axios.get(`${fetchAllBlogsByPageURL}?userId=${user._id}&page=${page}`);

            if (response.status === 200) {
                setUserBlogs([...response.data.blogs, ...userBlogs]);
                setPage(page + 1);

                if (response.data.blogs.length === 0) {
                    setShowMoreButton(false);
                    toast.success("All blogs have been fetched");
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const showMoreBlogsButton = () => {
        fetchBlogs(page);
    };

    return (
        <>
            {user && user.isAdmin ? (
                <div
                    className={`transition-all min-h-screen border my-2 mx-2 rounded-md w-full items-center md:mx-5 overflow-x-auto scrollbar ${theme === "dark" ? "border-zinc-700" : "border-gray-300"
                        }`}
                >
                    <div className="my-5">
                        <table className="w-full text-sm text-left">
                            <thead
                                className={`text-base ${theme === "dark"
                                        ? "text-gray-100 bg-zinc-700"
                                        : "text-gray-700 bg-gray-300"
                                    }`}
                            >
                                <tr>
                                    <th
                                        className={`md:text-sm text-xs px-5 py-3 ${theme === "dark" ? "border-gray-500" : "border-gray-400"
                                            } border-b`}
                                    >
                                        Updated on
                                    </th>
                                    <th
                                        className={`md:text-sm text-xs px-5 py-3 ${theme === "dark" ? "border-gray-500" : "border-gray-400"
                                            } border-b border-l`}
                                    >
                                        Blog Image
                                    </th>
                                    <th
                                        className={`md:text-sm text-xs px-5 py-3 ${theme === "dark" ? "border-gray-500" : "border-gray-400"
                                            } border-b border-l`}
                                    >
                                        Blog Title
                                    </th>
                                    <th
                                        className={`md:text-sm text-xs px-5 py-3 ${theme === "dark" ? "border-gray-500" : "border-gray-400"
                                            } border-b border-l`}
                                    >
                                        Blog Category
                                    </th>
                                    <th
                                        className={`md:text-sm text-xs px-5 py-3 ${theme === "dark" ? "border-gray-500" : "border-gray-400"
                                            } border-b border-l`}
                                    >
                                        Edit
                                    </th>
                                    <th
                                        className={`md:text-sm text-xs px-5 py-3 ${theme === "dark" ? "border-gray-500" : "border-gray-400"
                                            } border-b border-l`}
                                    >
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {loader ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            <BlogLoader />
                                        </td>
                                    </tr>
                                ) : userBlogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-16">
                                            <div className="flex flex-col items-center justify-center">
                                                <PiSmileySad size={50} className="text-yellow-400 mb-4" />
                                                <p className="text-xl font-semibold text-gray-500">No Blog list Found</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    userBlogs.map((data, index) => (
                                        <tr
                                            key={index}
                                            className={`transition-all hover:bg-gray-50 ${theme === "dark" &&
                                                "bg-gray-800 border-gray-700 hover:bg-gray-600"
                                                }`}
                                        >
                                            {/* Blog Updated Date */}
                                            <td
                                                className={`whitespace-nowrap font-medium text-xs md:text-sm px-5 py-4 ${theme === "dark" ? "text-white border-gray-700" : "border-gray-300"
                                                    } border-b`}
                                            >
                                                {new Date(data.updatedAt).toDateString()}
                                            </td>

                                            {/* Blog Image */}
                                            <td
                                                className={`px-5 py-4 ${theme === "dark" ? "border-gray-700" : "border-gray-300"
                                                    } border-l border-b`}
                                            >
                                                <NavLink to={`/blog/${data.slug}`}>
                                                    <img
                                                        src={data.blogImgFile}
                                                        alt="blogImage"
                                                        className="w-20 h-10 object-cover bg-gray-500 rounded"
                                                    />
                                                </NavLink>
                                            </td>

                                            {/* Blog Title */}
                                            <td
                                                className={`px-5 md:pl-10 py-4 text-xs md:text-justify text-left md:text-sm ${theme === "dark" ? "text-gray-300 border-gray-700" : "border-gray-300"
                                                    } border-l border-b`}
                                            >
                                                <NavLink to={`/blog/${data.slug}`}>
                                                    <p className="hover:text-blue-600 transition-colors">{data.blogTitle}</p>
                                                </NavLink>
                                            </td>

                                            {/* Blog Category */}
                                            <td className={`text-xs md:text-sm text-justify px-5 py-4 ${theme === "dark" ? "border-gray-700" : "border-gray-300"
                                                } border-l border-b`}>
                                                <span className={`px-2 py-1 rounded-full text-xs ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                                                    }`}>
                                                    {data.blogCategory}
                                                </span>
                                            </td>

                                            {/* Blog Edit Button */}
                                            <td className={`px-5 py-4 ${theme === "dark" ? "border-gray-700" : "border-gray-300"
                                                } border-l border-b`}>
                                                <NavLink
                                                    to={`/update-blog/${data._id}`}
                                                    className="text-green-500 hover:text-green-700 hover:underline transition-colors"
                                                >
                                                    Edit
                                                </NavLink>
                                            </td>

                                            {/* Blog Delete Button */}
                                            <td className={`px-5 py-4 ${theme === "dark" ? "border-gray-700" : "border-gray-300"
                                                } border-l border-b`}>
                                                <button
                                                    className="text-red-500 hover:text-red-700 hover:underline transition-colors"
                                                    onClick={() => deleteBlogHandle(data._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {showMoreButton && (
                        <div className="text-center my-5">
                            <button
                                onClick={showMoreBlogsButton}
                                className={`transition-all active:scale-95 hover:bg-blue-900 py-1 font-semibold text-xs px-2 border rounded-sm ${theme === "dark"
                                        ? "bg-gray-700 active:bg-gray-800 text-gray-300 border-gray-400"
                                        : "active:bg-gray-600 active:text-white hover:text-white bg-gray-300 text-gray-800 border-gray-500"
                                    }`}
                            >
                                Show more..
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                // <div className="min-h-screen flex w-full justify-center items-center">
                //     <span className="flex md:items-center absolute top-72 left-50 md:static md:justify-center">
                //         <BlogLoader />
                //     </span>
                // </div>
                ''
            )}

            <Toaster />

            {/*  Conditionally rendering the popup modal :  */}
            {blogModal && (
                <BlogPopupModal
                    blogModal={blogModal}
                    setBlogModal={setBlogModal}
                    blogId={blogId}
                    setUserBlogs={setUserBlogs}
                />
            )}
        </>
    );
};

export default AllBlogs;
