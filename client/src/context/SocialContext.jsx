import PropTypes from "prop-types";
import { createContext, useState, useContext, useEffect } from "react";
import { getPosts, createPost, updatePost, deletePost, likePost, unlikePost, addComment, deleteComment } from "../api/social";

export const SocialContext = createContext();

export const useSocial = () => {
    const context = useContext(SocialContext);
    if (!context) {
        throw new Error("useSocial debe estar dentro del proveedor SocialContext");
    }
    return context;
};

export const SocialProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await getPosts();
            setPosts(response.data);
            setError(null);
        } catch (error) {
            console.error("Error al obtener posts:", error);
            setError("Error al cargar los posts");
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async (postData) => {
        try {
            const response = await createPost(postData);
            setPosts([response.data, ...posts]);
            return response.data;
        } catch (error) {
            console.error("Error al crear post:", error);
            throw error;
        }
    };

    const handleUpdatePost = async (id, postData) => {
        try {
            const response = await updatePost(id, postData);
            setPosts(posts.map(post => post._id === id ? response.data : post));
            return response.data;
        } catch (error) {
            console.error("Error al actualizar post:", error);
            throw error;
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deletePost(id);
            setPosts(posts.filter(post => post._id !== id));
        } catch (error) {
            console.error("Error al eliminar post:", error);
            throw error;
        }
    };

    const handleLikePost = async (id) => {
        try {
            const response = await likePost(id);
            setPosts(posts.map(post => post._id === id ? response.data : post));
        } catch (error) {
            console.error("Error al dar like:", error);
            throw error;
        }
    };

    const handleUnlikePost = async (id) => {
        try {
            const response = await unlikePost(id);
            setPosts(posts.map(post => post._id === id ? response.data : post));
        } catch (error) {
            console.error("Error al quitar like:", error);
            throw error;
        }
    };

    const handleAddComment = async (postId, commentData) => {
        try {
            const response = await addComment(postId, commentData);
            setPosts(posts.map(post => post._id === postId ? response.data : post));
            return response.data;
        } catch (error) {
            console.error("Error al añadir comentario:", error);
            throw error;
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        try {
            const response = await deleteComment(postId, commentId);
            setPosts(posts.map(post => post._id === postId ? response.data : post));
        } catch (error) {
            console.error("Error al eliminar comentario:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <SocialContext.Provider value={{
            posts,
            loading,
            error,
            createPost: handleCreatePost,
            updatePost: handleUpdatePost,
            deletePost: handleDeletePost,
            likePost: handleLikePost,
            unlikePost: handleUnlikePost,
            addComment: handleAddComment,
            deleteComment: handleDeleteComment,
            refreshPosts: fetchPosts
        }}>
            {children}
        </SocialContext.Provider>
    );
};

SocialProvider.propTypes = {
    children: PropTypes.node.isRequired,
}; 