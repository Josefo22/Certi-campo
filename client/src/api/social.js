import axios from './axios.js';

export const getPosts = () => axios.get('/posts');
export const createPost = (post) => axios.post('/posts', post);
export const updatePost = (id, post) => axios.put(`/posts/${id}`, post);
export const deletePost = (id) => axios.delete(`/posts/${id}`);
export const likePost = (id) => axios.post(`/posts/${id}/like`);
export const unlikePost = (id) => axios.post(`/posts/${id}/unlike`);
export const addComment = (id, comment) => axios.post(`/posts/${id}/comments`, comment);
export const deleteComment = (postId, commentId) => axios.delete(`/posts/${postId}/comments/${commentId}`); 