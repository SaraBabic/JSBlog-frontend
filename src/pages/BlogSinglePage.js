import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import MainLayout from '../layout/MainLayout';

function BlogSinglePage() {
  const { slug } = useParams(); // Dohvatanje slug parametra iz URL-a
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
      });
  }, [slug]);

  return (
    <MainLayout>

      {!article ? (
        <p>Loading...</p>
      ) : (
        <div className="container mt-4">
          <h1>{article.title}</h1>
          <p className="text-muted">
            {Moment(article.createdAt).format('D MMM YYYY')}
          </p>
          <p>{article.markdown}</p>
        </div>
      )}
    </MainLayout>
  );
}

export default BlogSinglePage;
