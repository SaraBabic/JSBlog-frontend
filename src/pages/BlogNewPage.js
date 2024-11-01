import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { useNavigate } from 'react-router-dom';

function BlogNewPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    markdown: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('markdown', formData.markdown);
    
    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }
    fetch('/api/blogs', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => {
        if (response.ok) {
          navigate('/blog');
        } else {
          console.error('Failed to create new blog');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <MainLayout>
      <h1 className="mb-10">New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="markdown">Markdown</label>
          <textarea
            required
            name="markdown"
            id="markdown"
            className="form-control"
            value={formData.markdown}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Image</label>
          <input
            type="file"
            name="file"
            id="file"
            className="form-control-file"
            onChange={handleFileChange}
          />
        </div>
        <button type="button" onClick={() => navigate('/blog')} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </MainLayout>
  );
}

export default BlogNewPage;
