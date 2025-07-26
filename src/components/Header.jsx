import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CgUserlane, CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { LuSunMedium } from "react-icons/lu";
import { HiMoon } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { PiSignOutDuotone } from "react-icons/pi";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../features/themeSlice";
import { signOutSuccess, signOutUserFailure } from "../features/userSlice";
import axios from "axios";
import { signOutUserURL } from "../api/url";
import Search from "./Search";

const Header = () => {
  const [showSearchComponent, setShowSearchComponent] = useState(false);
  const location = useLocation();
  const [toggleTheme, setToggleTheme] = useState(false);
  const [toggleNavBtn, setToggleNavBtn] = useState(false);
  const { user } = useSelector((state) => state.userSliceApp);
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.themeSliceApp);
  const navigate = useNavigate();
  const [searchBlog, setSearchBlog] = useState("");

  const themeToggle = () => {
    setToggleTheme(!toggleTheme);
    dispatch(changeTheme());
  };

  const signOutHandle = async () => {
    try {
      const signOutUser = await axios.post(signOutUserURL);
      if (signOutUser.data.success === true) {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      signOutUserFailure(error);
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const getURL = new URLSearchParams(location.search);
    getURL.set("searchblog", searchBlog);
    navigate(`/search?${getURL.toString()}`);
  };

  useEffect(() => {
    const getURL = new URLSearchParams(location.search);
    const getData = getURL.get("searchBlog");
    if (getData) setSearchBlog(getData);
  }, [location.search]);

  const mobileSearchHandle = () => navigate("/search");

  return (
    <nav
      className={`z-20 sticky top-0 border-b shadow-sm md:px-10 px-4 py-2 transition-all duration-300 ${
        theme === "dark"
          ? "bg-zinc-800 border-gray-700"
          : "bg-blue-100 border-gray-300"
      }`}
    >
      {/* Desktop */}
      <div className="md:flex hidden justify-between items-center">
        <NavLink
          to="/"
          className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-3 py-1 rounded-md"
        >
          Blogify
        </NavLink>

        <form onSubmit={submitHandle} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchBlog}
            onChange={(e) => setSearchBlog(e.target.value)}
            className={`py-2 px-4 rounded-md border outline-none ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-500"
                : "bg-white border-gray-400"
            }`}
          />
          <IoMdSearch
            size={20}
            className="absolute top-2.5 right-3 text-gray-500"
          />
        </form>

        <button onClick={themeToggle} aria-label="Toggle Theme">
          {toggleTheme ? <HiMoon size={26} /> : <LuSunMedium size={26} />}
        </button>

        {user ? (
          <>
            {/* Conditional Nav Links for Desktop */}
            {user.isAdmin ? (
              <NavLink
                to="/dashboard?tab=createblog"
                className="bg-violet-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-violet-700 transition-all mr-2"
              >
                CreateBlog
              </NavLink>
            ) : (
              <NavLink
                to="/blog"
                className="bg-blue-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-blue-700 transition-all mr-2"
              >
                ViewAllBlog
              </NavLink>
            )}
            <div className="relative">
              <img
                src={user.profilePicture}
                className="w-11 h-11 rounded-full cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />

              <AnimatePresence>
                {dropDown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-40 rounded-md shadow-md p-3 z-20 ${
                      theme === "dark"
                        ? "bg-zinc-700 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    <NavLink
                      to="/dashboard?tab=profile"
                      className="flex items-center gap-2 py-2 hover:underline"
                    >
                      <CgProfile size={20} /> Profile
                    </NavLink>
                    <button
                      onClick={signOutHandle}
                      className="flex items-center gap-2 py-2 hover:underline"
                    >
                      <PiSignOutDuotone size={20} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <NavLink
              to="/login"
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
            >
              Get Started <MdOutlineKeyboardDoubleArrowRight size={20} />
            </NavLink>
          )
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex justify-between items-center">
        <NavLink
          to="/"
          className="text-lg font-bold text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-2 py-1 rounded-md"
        >
          Blogify
        </NavLink>

        <div className="flex items-center gap-4">
          <IoMdSearch
            size={24}
            onClick={mobileSearchHandle}
            className="cursor-pointer"
          />
          <button onClick={themeToggle} aria-label="Toggle Theme">
            {toggleTheme ? <HiMoon size={24} /> : <LuSunMedium size={24} />}
          </button>

          {user && (
            <>
              {/* Conditional Nav Links for Mobile */}
              {user.isAdmin ? (
                <NavLink
                  to="/dashboard?tab=createblog"
                  className="bg-violet-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-violet-700 transition-all"
                >
                  CreateBlog
                </NavLink>
              ) : (
                <NavLink
                  to="/dashboard?tab=blogs"
                  className="bg-blue-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-blue-700 transition-all"
                >
                  ViewAllBlog
                </NavLink>
              )}
              <div className="relative">
                <img
                  src={user?.profilePicture}
                  alt="User Image"
                  className="w-9 h-9 rounded-full cursor-pointer"
                  onClick={() => setDropDown(!dropDown)}
                />
                <AnimatePresence>
                  {dropDown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute right-0 top-12 w-36 rounded-md shadow-md p-3 z-20 ${
                        theme === "dark"
                          ? "bg-zinc-700 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      <NavLink
                        to="/dashboard?tab=profile"
                        className="flex items-center gap-2 py-2 hover:underline"
                      >
                        <CgProfile size={20} /> Profile
                      </NavLink>
                      <button
                        onClick={signOutHandle}
                        className="flex items-center gap-2 py-2 hover:underline"
                      >
                        <PiSignOutDuotone size={20} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

          <button onClick={() => setToggleNavBtn(!toggleNavBtn)}>
            {toggleNavBtn ? (
              <AiOutlineClose size={22} />
            ) : (
              <RxHamburgerMenu size={22} />
            )}
          </button>
        </div>
      </div>

      {toggleNavBtn && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`md:hidden flex flex-col items-center py-6 gap-4 ${
            theme === "dark"
              ? "bg-zinc-800 text-white"
              : "bg-blue-100 text-black"
          }`}
        >
          {!user &&
            location.pathname !== "/login" &&
            location.pathname !== "/register" && (
              <NavLink
                to="/login"
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
              >
                Get Started <MdOutlineKeyboardDoubleArrowRight size={20} />
              </NavLink>
            )}
        </motion.div>
      )}

      {showSearchComponent && <Search />}
    </nav>
  );
};

export default Header;
