import { useAuth } from '../context/AuthContext';
import { useSocial } from '../context/SocialContext';
import { useState } from 'react';
import MenuPrincipal from '../components/MenuPrincipal';
import './RedSocial.css';

function RedSocial() {
  const { user } = useAuth();
  const { posts, loading, error, createPost, likePost, unlikePost, addComment } = useSocial();
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await createPost({
        content: newPost,
        category: 'general',
        tags: [],
        images: []
      });
      setNewPost('');
    } catch (error) {
      console.error('Error al crear post:', error);
    }
  };

  const handleSubmitComment = async (postId) => {
    if (!newComment[postId]?.trim()) return;

    try {
      await addComment(postId, {
        content: newComment[postId],
        author: user._id
      });
      setNewComment({ ...newComment, [postId]: '' });
    } catch (error) {
      console.error('Error al añadir comentario:', error);
    }
  };

  const filteredPosts = selectedCategory === 'todos' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="background-redsocial">
      <MenuPrincipal />
      <div className="red-social-container">
        <h1>Foro de CertiCampo</h1>
        
        <div className="post-form">
          <form onSubmit={handleSubmitPost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="¿Qué quieres compartir con la comunidad?"
              rows="3"
            />
            <button type="submit">Publicar</button>
          </form>
        </div>

        <div className="category-filter">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="todos">Todas las categorías</option>
            <option value="tecnologia">Tecnología</option>
            <option value="cultivos">Cultivos</option>
            <option value="eventos">Eventos</option>
            <option value="mercado">Mercado</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Cargando posts...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="posts-container">
            {filteredPosts.map(post => (
              <div key={post._id} className="post-card">
                <div className="post-header">
                  <h3>{post.author?.name || 'Usuario'}</h3>
                  <span className="post-category">{post.category}</span>
                </div>
                
                <div className="post-content">
                  <p>{post.content}</p>
                  {post.images?.length > 0 && (
                    <div className="post-images">
                      {post.images.map((image, index) => (
                        <img key={index} src={image} alt={`Imagen ${index + 1}`} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="post-actions">
                  <button 
                    onClick={() => post.likes?.includes(user._id) 
                      ? unlikePost(post._id) 
                      : likePost(post._id)
                    }
                    className={post.likes?.includes(user._id) ? 'liked' : ''}
                  >
                    <i className="fas fa-heart"></i> {post.likes?.length || 0}
                  </button>
                  <button>
                    <i className="fas fa-comment"></i> {post.comments?.length || 0}
                  </button>
                </div>

                <div className="comments-section">
                  {post.comments?.map(comment => (
                    <div key={comment._id} className="comment">
                      <strong>{comment.author?.name || 'Usuario'}:</strong>
                      <p>{comment.content}</p>
                    </div>
                  ))}
                  
                  <div className="comment-form">
                    <input
                      type="text"
                      value={newComment[post._id] || ''}
                      onChange={(e) => setNewComment({
                        ...newComment,
                        [post._id]: e.target.value
                      })}
                      placeholder="Escribe un comentario..."
                    />
                    <button onClick={() => handleSubmitComment(post._id)}>
                      Comentar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RedSocial;