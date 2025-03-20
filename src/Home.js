import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchArticles = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/items');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      setError('Error fetching articles: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:5000/news/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setArticles(articles.filter(article => article._id !== id));
      } catch (error) {
        setError('Error deleting article: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNavigateToForm = (article = null) => {
    navigate('/article-form', { state: { article } });
  };

  return (
    <main className="mx-3">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <h2 className="text-white mt-2 ms-2">Latest News</h2>
      <div className="news-articles">
        {articles.map((article) => (
          <div key={article._id} className="news-article">
            <h3>{article.title}</h3>
            {article.image && <img src={article.image} alt={article.title} className="article-image" />} {/* Image added here */}
            <a className="article" href={article.url}>{article.description}</a>
            <div>
              <button onClick={() => handleNavigateToForm(article)}>Edit</button>
              <button onClick={() => handleDelete(article._id)} style={{ marginLeft: '10px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add ms-2" onClick={() => handleNavigateToForm()}>Add New Article</button>
    </main>
  );
}

export default Home;