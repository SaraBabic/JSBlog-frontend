import React, { useEffect, useState, useContext } from "react";
import Moment from "moment";
import MainLayout from "../layout/MainLayout";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function BlogPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBackendData((prevData) =>
          prevData.filter((article) => article._id !== id)
        );
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
      {isLoggedIn && (
        <>
          <Link to="/blog/new" className="btn btn-success">
            New Article
          </Link>
        </>
      )}
      {backendData.length === 0 ? (
        <p>Loading ... </p>
      ) : (
        backendData.map((article) => (
          <div className="card mt-4" key={article._id}>
            <div className="card-body">
              <h4 className="card-title">{article.title}</h4>
              <div className="card-subtitle text-muted mb-2">
                {Moment(article.createdAt).format("D MMM Y")}
              </div>
              <div className="card-text mb-2">{article.description}</div>

              {/* Render the image if it exists */}
              {article.imagePath && (
                  <img
                    src={`/${article.imagePath}`}
                    alt={article.title}
                    className="img-fluid mb-3"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                )}

              <Link to={`${article.slug}`} className="btn btn-primary">
                Read More
              </Link>
              {isLoggedIn && (
                <>
                  <Link to={`edit/${article._id}`} className="btn btn-info">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </MainLayout>
  );
}

export default BlogPage;
