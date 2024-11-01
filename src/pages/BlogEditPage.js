import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

function BlogEditPage() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: '',
    description: '',
    markdown: '',
    file: null,
    imagePath: '',
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
        setArticle({
          ...data,
          imagePath: data.imagePath || '',
        });
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

  const handleFileChange = (e) => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('description', article.description);
    formData.append('markdown', article.markdown);
    if (article.file) {
      formData.append('file', article.file);
    }

    fetch(`/api/edit/${_id}`, {
      method: 'PUT',
      body: formData,
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
        <div className="form-group">
          <label htmlFor="file">Image</label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="form-control-file"
          />
        </div>

        {/* Display the current image if it exists */}
        {article.imagePath && (
          <div className="form-group">
            <label>Current Image</label>
            <img src={`/${article.imagePath}`} alt="Current Article" style={{ maxWidth: '200px', margin: '10px 0' }} />
          </div>
        )}

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
