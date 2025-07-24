// Centralized API Endpoints for Blogigy
export const baseURL = 'https://blogify-backend-4e4o.onrender.com';
// export const baseURL = 'http://localhost:5000';

// BLOG ENDPOINTS
export const fetchAllBlogsURL = `${baseURL}/api/blog/get-all-blogs`;
export const fetchBlogByIdURL = (blogId) => `${baseURL}/api/blog/get-all-blogs?blogId=${blogId}`;
export const fetchBlogBySlugURL = (slug) => `${baseURL}/api/blog/get-all-blogs?slug=${slug}`;
export const fetchAllBlogsByUserURL = (userId) => `${baseURL}/api/blog/get-all-blogs?userId=${userId}`;
export const fetchAllBlogsByPageURL = (userId, page) => `${baseURL}/api/blog/get-all-blogs?userId=${userId}&page=${page}`;
export const fetchAllBlogsWithLimitURL = (limit) => `${baseURL}/api/blog/get-all-blogs?limit=${limit}`;
export const postBlogURL = `${baseURL}/api/blog/post-blog`;
export const updateBlogURL = (blogId, userId) => `${baseURL}/api/blog/update-blog/${blogId}/${userId}`;
export const deleteBlogURL = `${baseURL}/api/blog/delete-blog`;
export const deleteBlogByIdURL = (blogId, userId) => `${baseURL}/api/blog/delete-blog/${blogId}/${userId}`;

// USER ENDPOINTS
export const getUsersURL = `${baseURL}/api/user/getusers`;
export const getUsersByPageURL = (page) => `${baseURL}/api/user/getusers?page=${page}`;
export const getUsersByUserParamURL = (user) => `${baseURL}/api/user/getusers?user=${user}`;
export const deleteUserURL = `${baseURL}/api/user/deleteuser`;
export const deleteUserByIdURL = (id) => `${baseURL}/api/user/deleteuser/${id}`;
export const updateUserURL = (userId) => `${baseURL}/api/user/update-user/${userId}`;
export const registerUserURL = `${baseURL}/api/user/register`;
export const loginUserURL = `${baseURL}/api/user/login`;
export const googleUserURL = `${baseURL}/api/user/googleuser`;
export const resetPasswordURL = `${baseURL}/api/user/reset-password`;

// COMMENT ENDPOINTS
export const getAllCommentsURL = `${baseURL}/api/comment/get-all-comments`;
export const getAllCommentsByPageURL = (page) => `${baseURL}/api/comment/get-all-comments?page=${page}`;
export const getAllCommentsWithLimitURL = (limitComments) => `${baseURL}/api/comment/get-all-comments?limitComments=${limitComments}`;
export const deleteCommentURL = `${baseURL}/api/comment/delete-comment`;
export const deleteCommentByIdURL = (id) => `${baseURL}/api/comment/delete-comment/${id}`;
export const postCommentURL = `${baseURL}/api/comment/post-comment`;
export const updateCommentURL = (id) => `${baseURL}/api/comment/update-comment/${id}`;

export const searchBlogsURL = `${baseURL}/api/blog/get-all-blogs`;

export const addCommentURL = `${baseURL}/api/comment/add-comment`;
export const getCommentURL = (blogId) => `${baseURL}/api/comment/get-comment/${blogId}`;
export const signOutUserURL = `${baseURL}/api/user/signoutuser`;
export const getUserCommentURL = (userId) => `${baseURL}/api/user/get-user-comment/${userId}`;
export const editCommentURL = (commentId) => `${baseURL}/api/comment/edit-comment/${commentId}`;
export const likeTheCommentURL = (commentId) => `${baseURL}/api/comment/like-the-comment/${commentId}`;
// Add additional endpoints as needed below (e.g., image upload, etc.)