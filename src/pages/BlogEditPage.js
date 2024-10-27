import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

function BlogEditPage() {
  const { _id } = useParams();

  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: '',
    description: '',
    markdown: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/edit/${_id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load article');
        return response.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/edit/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/blog');
        } else {
          console.error('Failed to update article');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <MainLayout>
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            required
            value={article.title}
            onChange={handleChange}
            type="text"
            name="title"
            id="title"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            value={article.description}
            onChange={handleChange}
            name="description"
            id="description"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="markdown">Markdown</label>
          <textarea
            required
            value={article.markdown}
            onChange={handleChange}
            name="markdown"
            id="markdown"
            className="form-control"
          />
        </div>
        <Link to="/blog" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </MainLayout>
  );
}

export default BlogEditPage;
