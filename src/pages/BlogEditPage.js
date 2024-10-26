import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

function BlogEditPage() {
    const { _id } = useParams();
    const [article, setArticle] = useState({
        title: '',
        description: '',
        markdown: ''
    });

    useEffect(() => {
      fetch(`/api/edit/${_id}`)
        .then((response) => response.json())
        .then((data) => {
          setArticle(data);
        });
    }, [_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle((prevArticle) => ({
          ...prevArticle,
          [name]: value,
        }));
    };

    return (
      <MainLayout> 
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
          <Link to="/blog" className="btn btn-secondary">Cancel</Link>
          <button type="submit" className="btn btn-primary">Save</button>
      </MainLayout>
    );
}

export default BlogEditPage;
