import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ArticleForm.css';

function ArticleForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingArticle = location.state?.article || null;

  const [newArticle, setNewArticle] = useState({
    title: editingArticle?.title || '',
    description: editingArticle?.description || '',
    url: editingArticle?.url || '',
    image: editingArticle?.image || '', // Added image field
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({ ...newArticle, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(editingArticle ? `http://localhost:5000/news/${editingArticle._id}` : 'http://localhost:5000/news', {
        method: editingArticle ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      navigate('/');
    } catch (error) {
      setError('Error adding/updating article: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-white text-center mt-2">{editingArticle ? 'Edit Article' : 'Add New Article'}</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newArticle.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newArticle.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="url"
          name="url"
          placeholder="URL"
          value={newArticle.url}
          onChange={handleInputChange}
          required
        />
        <input
          type="url"
          name="image" // New input for image URL
          placeholder="Image URL"
          value={newArticle.image}
          onChange={handleInputChange}
          required={editingArticle ? false : true} // Make it required only for new articles
        />
        <button type="submit">{editingArticle ? 'Update Article' : 'Add Article'}</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
}

export default ArticleForm;