import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  addBlogStart,
  addBlogFailure,
  addBlogSuccess,
} from "../features/blogSlice";
import FirebaseLoader from "../assests/firebaseLoader/FirebaseLoader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBlogURL } from "../api/url";

const CreateBlog = () => {
  const { user } = useSelector((state) => state.userSliceApp);
  const { theme } = useSelector((state) => state.themeSliceApp);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [blogImage, setBlogImage] = useState(null);
  const [cloudinaryBlogImgUrl, setCloudinaryBlogImgUrl] = useState(null);
  const [imageLoader, setImageLoader] = useState(false);

  const [formData, setFormData] = useState({
    blogTitle: "",
    blogCategory: "",
    blogBody: "",
    blogImgFile: "",
    userId: user?._id || "",
  });

  const blogImgChangeHandle = (e) => {
    const file = e.target.files[0];
    setBlogImage(file);
  };

  const cloudinaryUploadImg = async () => {
    if (!blogImage) {
      toast.error("Select an image!");
      return;
    }

    const data = new FormData();
    data.append("file", blogImage);
    data.append("upload_preset", "upload_preset"); // Update to your actual preset
    data.append("cloud_name", "dgdxjjvfm");

    try {
      setImageLoader(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgdxjjvfm/image/upload",
        data
      );
      const imageUrl = response.data.secure_url;
      setCloudinaryBlogImgUrl(imageUrl);
      setFormData({ ...formData, blogImgFile: imageUrl });
      setImageLoader(false);
      toast.success("Image uploaded successfully");
    } catch (error) {
      setImageLoader(false);
      toast.error("Failed to upload image");
    }
  };

  const inputChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const reactQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, blogBody: value }));
  };

  const publishBlogBtn = (e) => {
    e.preventDefault();
    validateForm(formData);
  };

  const validateForm = async (data) => {
    if (!data.blogTitle) return toast.error("Blog title is required!");
    if (!data.blogBody || data.blogBody.length < 20)
      return toast.error("Post body must be at least 20 characters!");

    if (!user || !user.token) {
      return toast.error("You must be logged in to create a blog!");
    }

    try {
      dispatch(addBlogStart());
      const addBlog = await axios.post(postBlogURL, data, {
        headers: { Authorization: user.token },
      });

      if (addBlog.status === 200) {
        dispatch(addBlogSuccess(addBlog.data.blog));
        navigate(`/blog/${addBlog.data.blog.slug}`);
      }
    } catch (error) {
      dispatch(addBlogFailure(error));
      toast.error("Failed to publish blog");
    }
  };

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 md:px-12 py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-violet-500 font-bold mb-6 text-center">
        📝 Create Blog
      </h1>

      <form className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="blogTitle"
            value={formData.blogTitle}
            onChange={inputChangeHandle}
            placeholder="Blog Title"
            className={`py-2 px-4 rounded-md border w-full outline-none ${
              theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white border-gray-300"
            }`}
          />

          <select
            name="blogCategory"
            value={formData.blogCategory}
            onChange={inputChangeHandle}
            className={`py-2 px-4 rounded-md border w-full outline-none ${
              theme === "dark" ? "bg-gray-800 text-white border-gray-600" : "bg-white border-gray-300"
            }`}
          >
            <option disabled value="">
              Select Category
            </option>
            <option>Java</option>
            <option>Javascript</option>
            <option>React Js</option>
            <option>Git</option>
            <option>Mongo DB</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center border-2 border-dashed border-violet-500 p-4 rounded-md">
          <input
            type="file"
            accept="image/*"
            onChange={blogImgChangeHandle}
            className="w-full sm:w-auto"
          />

          {imageLoader ? (
            <div className="flex items-center gap-2 text-violet-600 font-medium">
              <FirebaseLoader />
              Uploading...
            </div>
          ) : (
            <button
              type="button"
              onClick={cloudinaryUploadImg}
              className="text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded shadow"
            >
              Upload Image
            </button>
          )}
        </div>

        {cloudinaryBlogImgUrl && (
          <div className="w-full">
            <img
              src={cloudinaryBlogImgUrl}
              alt="Uploaded blog"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <ReactQuill
          theme="snow"
          value={formData.blogBody}
          onChange={reactQuillChange}
          className="bg-white rounded-md h-64"
        />

        <button
          type="submit"
          onClick={publishBlogBtn}
          className="w-full sm:w-48 self-center bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Publish Blog
        </button>
      </form>

      <Toaster />
    </div>
  );
};

export default CreateBlog;
