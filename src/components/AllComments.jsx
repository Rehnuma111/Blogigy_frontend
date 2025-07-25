import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  getAllCommentsURL,
  getAllCommentsByPageURL,
  deleteCommentByIdURL,
} from "../api/url";
// Removed flowbite-react Table import
import Spinner from "../assests/spinner/Spinner";
import { NavLink } from "react-router-dom";
import { ImWarning } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const AllComments = () => {
  const { user } = useSelector((state) => state.userSliceApp);
  const { theme } = useSelector((state) => state.themeSliceApp);
  const [loader, setLoader] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [getAllComments, setAllComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const [startPage, setStartPage] = useState(1);

  // Fetch Comments :
  useEffect(() => {
    if (user.isAdmin) {
      const getComments = async () => {
        try {
          const commentInfo = await axios.get(getAllCommentsURL, {
            headers: {
              Authorization: user.token
              },
          });

          const response = commentInfo.data.comments;
          setAllComments(response);
          if (response.length > 4) {
            setShowMoreButton(true);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      getComments();
    }
  }, []);

  const deleteUserHandle = (id) => {
    setShowModal(true);
    setCommentIdToDelete(id);
  };

  const cancelHandle = () => {
    setShowModal(false);
  };

  // Show more comments
  const showMoreCommentButton = async () => {
    try {
      const response = await axios.get(
        `${getAllCommentsByPageURL}?page=${startPage + 1}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      if (response.status === 200) {
        const newComment = response.data.comments;
        setStartPage(startPage + 1);
        console.log(newComment);
        setAllComments([...getAllComments, ...newComment]);

        if (response.data.comments.length === 0) {
          setShowMoreButton(false);
          toast.success("All blogs have been fetched");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const yesToDeleteComment = async () => {
    try {
      const deleteCommentInfo = await axios.delete(
        deleteCommentByIdURL(commentIdToDelete),
        {
          data: {
            user: user,
          },
          headers: {
            Authorization: user.token,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setAllComments(
          getAllComments.filter(
            (commentValue) => commentValue._id !== commentIdToDelete
          )
        );
        toast.success("Comment has been deleted");
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <div
        className={`min-h-screen shadow-sm border my-2 rounded-md w-full md:mx-5 table-auto overflow-x-scroll scrollbar  ${
          theme === "dark" ? "border-zinc-700" : "border-gray-200"
        } mx-2 md:mx-0`}
      >
        {getAllComments.length > 0 && (
          <div className="my-5">
            <table className="w-full text-sm text-left">
              <thead
                className={`text-base ${
                  theme === "dark"
                    ? "text-gray-100 bg-gray-700"
                    : "text-gray-700 bg-gray-300"
                }`}
              >
                <tr>
                  <th
                    className={`text-center font-semibold px-5 py-3 md:text-sm text-xs ${
                      theme === "dark" ? "border-gray-500" : "border-gray-400"
                    } border-b`}
                  >
                    Updated on
                  </th>
                  <th
                    className={`text-center font-semibold px-5 py-3 md:text-sm text-xs ${
                      theme === "dark" ? "border-gray-500" : "border-gray-400"
                    } border-b border-l`}
                  >
                    Comments
                  </th>
                  <th
                    className={`text-center font-semibold px-5 py-3 md:text-sm text-xs ${
                      theme === "dark" ? "border-gray-500" : "border-gray-400"
                    } border-b border-l`}
                  >
                    No.of likes
                  </th>
                  <th
                    className={`text-center font-semibold px-5 py-3 md:text-sm text-xs ${
                      theme === "dark" ? "border-gray-500" : "border-gray-400"
                    } border-b border-l`}
                  >
                    PostId
                  </th>
                  <th
                    className={`text-center font-semibold px-5 py-3 md:text-sm text-xs ${
                      theme === "dark" ? "border-gray-500" : "border-gray-400"
                    } border-b border-l`}
                  >
                    UserId
                  </th>
                  <th
                    className={`text-center font-semibold px-5 py-3 md:text-sm text-xs ${
                      theme === "dark" ? "border-gray-500" : "border-gray-400"
                    } border-b border-l`}
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loader ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10">
                      <Spinner />
                    </td>
                  </tr>
                ) : (
                  getAllComments.map((comments, index) => (
                    <tr
                      key={index}
                      className={`text-xs md:text-sm transition-all ${
                        theme === "dark"
                          ? "hover:bg-gray-800 bg-gray-800 border-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {/* Updated Date */}
                      <td
                        className={`text-center px-5 py-4 text-xs md:text-sm ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        } border-b`}
                      >
                        {new Date(comments.updatedAt).toLocaleDateString()}
                      </td>

                      {/* Comment Text */}
                      <td
                        className={`px-5 py-4 max-w-xs ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        } border-l border-b`}
                      >
                        <div className="truncate">
                          <NavLink to={`/blog`}>
                            <span className="hover:text-blue-600 transition-colors">
                              {comments.comment}
                            </span>
                          </NavLink>
                        </div>
                      </td>

                      {/* Likes Count */}
                      <td
                        className={`text-center px-5 py-4 text-xs md:text-sm ${
                          theme === "dark"
                            ? "text-gray-300 border-gray-700"
                            : "border-gray-300"
                        } border-l border-b`}
                      >
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            theme === "dark"
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {comments.likes.length}
                        </span>
                      </td>

                      {/* Post ID */}
                      <td
                        className={`text-center px-5 py-4 text-xs md:text-sm ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        } border-l border-b`}
                      >
                        <span className="font-mono text-xs break-all">
                          {comments.blogId}
                        </span>
                      </td>

                      {/* User ID */}
                      <td
                        className={`text-center px-5 py-4 text-xs md:text-sm ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        } border-l border-b`}
                      >
                        <span className="font-mono text-xs break-all">
                          {comments.userId}
                        </span>
                      </td>

                      {/* Delete Button */}
                      <td
                        className={`text-center px-5 py-4 ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        } border-l border-b`}
                      >
                        <button
                          className="text-red-500 hover:text-red-700 hover:underline transition-colors"
                          onClick={() => deleteUserHandle(comments._id)}
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
        )}

        {showMoreButton && (
          <div className="text-center my-5">
            <button
              onClick={showMoreCommentButton}
              className={`transition-all active:scale-95 hover:bg-blue-900 py-2 font-semibold text-sm px-2 border-2 rounded-md  ${
                theme === "dark"
                  ? "bg-gray-700 active:bg-gray-800 text-gray-200 border-gray-400"
                  : "active:bg-gray-600 active:text-white hover:text-white bg-gray-300 text-gray-800 border-gray-500"
              }`}
            >
              Show more..
            </button>
          </div>
        )}
      </div>

      {/* Showing Modal before deleting the Comments */}
      {showModal && (
        <div className="fixed inset-0  transition-all backdrop-blur-sm bg-opacity-30 flex justify-center items-center">
          <div
            className={`flex flex-col gap-7  shadow-md w-80 md:w-96 bg- rounded-md  px-3 justify-center items-center py-5   ${
              theme === "dark"
                ? "bg-zinc-800 text-gray-200"
                : "bg-white text-gray-900"
            }`}
          >
            <button
              className="place-self-end transition-all"
              onClick={cancelHandle}
            >
              <IoClose
                size={25}
                className=" active:animate-ping transition-all"
              />
            </button>

            <div className="">
              <ImWarning size={40} />
            </div>

            <div className="">
              <p className="text-base text-center">
                Are you sure you want to delete this comment ?
              </p>
            </div>

            <div className="flex gap-4">
              <button
                className={`text-sm  rounded-md transition-all active:bg-red-800 font-semibold py-2 px-2 active:scale-95  ${
                  theme === "dark" ? "bg-red-700" : "bg-red-400"
                }`}
                onClick={yesToDeleteComment}
              >
                Yes,I'm sure.
              </button>

              <button
                className=" border text-sm font-semibold  active:scale-95 transition-all bg-transparent rounded-md py-2 px-3 active:bg-gray-600"
                onClick={cancelHandle}
              >
                No, cancel.
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default AllComments;
