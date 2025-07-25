import axios from "axios";
import {
  getUsersByUserParamURL,
  fetchAllBlogsWithLimitURL,
  getAllCommentsWithLimitURL,
} from "../api/url";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const DashBaordComp = () => {
  const [userData, setUserData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [commentsData, setCommetsData] = useState([]);

  const [totalUsers, setTotalUser] = useState(0);
  const [totalBlogPosts, setTotalBlogPost] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthsPost] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { user } = useSelector((state) => state.userSliceApp);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchUserDetails = await axios.get(getUsersByUserParamURL(5), {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (fetchUserDetails.status === 200) {
          setUserData(fetchUserDetails.data.user);
          setTotalUser(fetchUserDetails.data.countUser);
          setLastMonthUsers(fetchUserDetails.data.lastMonthUsers);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };

    const fetchBlog = async () => {
      try {
        const fetchBlogDetails = await axios.get(fetchAllBlogsWithLimitURL(5));

        if (fetchBlogDetails.status === 200) {
          setBlogsData(fetchBlogDetails.data.blogs);
          setTotalBlogPost(fetchBlogDetails.data.countBlogs);
          setLastMonthsPost(fetchBlogDetails.data.lastMonthBlogs);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const fetchCommentDetails = await axios.get(
          getAllCommentsWithLimitURL(5),
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (fetchCommentDetails.status === 200) {
          setCommetsData(fetchCommentDetails.data.comments);
          setTotalComments(fetchCommentDetails.data.countDocument);
          setLastMonthComments(fetchCommentDetails.data.lastMonthComment);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };

    if (user.isAdmin) {
      fetchUser();
      fetchBlog();
      fetchComments();
    }
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
          <p className="text-sm text-gray-500">+{lastMonthUsers} new last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-600">Total Blogs</h2>
          <p className="text-3xl font-bold text-green-600">{totalBlogPosts}</p>
          <p className="text-sm text-gray-500">+{lastMonthPosts} added last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500">
          <h2 className="text-lg font-semibold text-gray-600">Total Comments</h2>
          <p className="text-3xl font-bold text-purple-600">{totalComments}</p>
          <p className="text-sm text-gray-500">+{lastMonthComments} last month</p>
        </div>
      </div>

      {/* Optional Recent Data Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">📍 Recent Users</h2>
        <ul className="space-y-2">
          {userData.map((user) => (
            <li key={user._id} className="p-4 bg-gray-100 rounded shadow-sm">
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashBaordComp;
