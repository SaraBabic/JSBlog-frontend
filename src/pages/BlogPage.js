import React, { useEffect, useState } from "react";
import Moment from "moment";
import MainLayout from "../layout/MainLayout";
import { Link } from "react-router-dom";

function BlogPage() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBackendData((prevData) => prevData.filter((article) => article._id !== id));
      } else {
        console.error("Failed to delete article");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  Moment.locale("en");

  return (
    <MainLayout>
      <h1 className="mb-4">Blog Articles</h1>
      <Link to="/blog/new" className="btn btn-success">
        New Article
      </Link>
      {typeof backendData === "undefined" ? (
        <p>Loading ... </p>
      ) : (
        backendData.map((article, i) => (
          <div className="card mt-4" key={i}>
            <div className="card-body">
              <h4 className="card-title">{article.title}</h4>
              <div className="card-subtitle text-muted mb-2">
                {Moment(article?.createdAt)?.format("D MMM Y")}
              </div>
              <div className="card-text mb-2">{article.description}</div>
              <Link to={`${article.slug}`} className="btn btn-primary">
                Read More
              </Link>
              <Link to={`edit/${article._id}`} className="btn btn-info">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(article._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </MainLayout>
  );
}

export default BlogPage;
