import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// Removed flowbite-react Table import
import Spinner from "../assests/spinner/Spinner";
import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { ImWarning } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const AllUsers = () => {
  const { user } = useSelector((state) => state.userSliceApp);
  const { theme } = useSelector((state) => state.themeSliceApp);
  const [loader, setLoader] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [getAllUsers, setAllUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [startPage, setStartPage] = useState(3);

  // Fetch user :
  useEffect(() => {
    if (user.isAdmin) {
      const getUsers = async () => {
        try {
          const userInfo = await axios.get(`/api/user/getusers`, {
            headers: {
              Authorization: user.token,
            },
          });
          const response = userInfo.data.user;
          setAllUsers(response);
          if (response.length > 8) {
            setShowMoreButton(true);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      getUsers();
    }
  }, []);

  const deleteUserHandle = (id) => {
    setShowModal(true);
    setUserId(id);
  };

  const cancelHandle = () => {
    setShowModal(false);
  };

  //   Delete user Api :
  const deleteUser = async () => {
    try {
      setShowModal(false);

      const userDelete = await axios.delete(`/api/user/deleteuser/${userId}`, {
        data: {
          user: user,
        },
        headers: {
          Authorization: user.token,
        },
      });
      if (userDelete.status === 200) {
        setAllUsers((users) => users.filter((users) => users._id !== userId));
        toast.success("User has been deleted successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const showMoreUserButton = async () => {
    setStartPage(startPage + 1);

    try {
      const showMoreUser = await axios.get(
        `/api/user/getusers?page=${startPage}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      if (showMoreUser.status === 200) {
        console.log(showMoreUser.data.user);

        if (showMoreUser.data.user.length > 0) {
          setStartPage((prevPage) => prevPage + 1);
          setAllUsers([...getAllUsers, ...showMoreUser.data.user]);
        } else {
          setShowMoreButton(false);
        }
      }
    } catch (error) {
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
        {getAllUsers.length > 0 && (
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
                    User Image
                  </th>
                  <th
                    className={`text-center font-semibold px-5 py-3 md:text-sm text-xs ${
                      theme === "dark" ? "border-gray-500" : "border-gray-400"
                    } border-b border-l`}
                  >
                    Username
                  </th>
                  <th
                    className={`text-center font-semibold px-5 py-3 md:text-sm text-xs ${
                      theme === "dark" ? "border-gray-500" : "border-gray-400"
                    } border-b border-l`}
                  >
                    Email
                  </th>
                  <th
                    className={`text-center font-semibold px-5 py-3 md:text-sm text-xs ${
                      theme === "dark" ? "border-gray-500" : "border-gray-400"
                    } border-b border-l`}
                  >
                    Admin
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
                  getAllUsers.map((user, index) => (
                    <tr
                      key={index}
                      className={`text-center text-xs md:text-sm transition-all ${
                        theme === "dark"
                          ? "hover:bg-gray-800 bg-gray-800 border-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {/* User Date */}
                      <td
                        className={`text-xs md:text-sm px-5 py-4 ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        } border-b`}
                      >
                        {new Date(user.updatedAt).toLocaleDateString()}
                      </td>

                      {/* User Image */}
                      <td
                        className={`px-5 py-4 ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        } border-l border-b`}
                      >
                        <div className="flex justify-center">
                          <NavLink to={`/user-profile/${user._id}`}>
                            <img
                              src={user.profilePicture}
                              alt="userImage"
                              className="w-10 h-10 rounded-full md:w-16 md:h-16 object-cover"
                            />
                          </NavLink>
                        </div>
                      </td>

                      {/* Username */}
                      <td
                        className={`px-5 py-4 text-xs md:text-sm ${
                          theme === "dark"
                            ? "text-gray-300 border-gray-700"
                            : "border-gray-300"
                        } border-l border-b`}
                      >
                        <span className="font-medium">{user.username}</span>
                      </td>

                      {/* Email */}
                      <td
                        className={`px-5 py-4 text-xs md:text-sm ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        } border-l border-b`}
                      >
                        <span className="break-all">{user.email}</span>
                      </td>

                      {/* Admin Status */}
                      <td
                        className={`px-5 py-4 ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        } border-l border-b`}
                      >
                        <div className="flex justify-center">
                          {user.isAdmin ? (
                            <TiTick color="green" size={25} />
                          ) : (
                            <RxCross2 size={23} color="red" />
                          )}
                        </div>
                      </td>

                      {/* Delete Button */}
                      <td
                        className={`px-5 py-4 ${
                          theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-300"
                        } border-l border-b`}
                      >
                        <button
                          className="text-red-500 hover:text-red-700 hover:underline transition-colors"
                          onClick={() => deleteUserHandle(user._id)}
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
              onClick={showMoreUserButton}
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

      {/* Showing Modal before deleting the user */}
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
                Are you sure you want to delete this user ?
              </p>
            </div>

            <div className="flex gap-4">
              <button
                className={`text-sm  rounded-md transition-all active:bg-red-800 font-semibold py-2 px-2 active:scale-95  ${
                  theme === "dark" ? "bg-red-700" : "bg-red-400"
                }`}
                onClick={deleteUser}
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

export default AllUsers;
