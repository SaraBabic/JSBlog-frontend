import React, { useEffect, useState, useContext } from "react";
import MainLayout from "../layout/MainLayout";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BlogTeaser from "../components/organisms/BlogTeaser";
import Headline from "../components/atoms/Headline";

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
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
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

  return (
    <MainLayout>
      <Headline text="Blog Articles" level={1} align="center" />
      {isLoggedIn && (
        <Link to="/blog/new" className="btn btn-success">
          New Article
        </Link>
      )}
      {backendData.length === 0 ? (
        <p>Loading ... </p>
      ) : (
        backendData.map((article) => (
          <BlogTeaser key={article._id} article={article} onDelete={handleDelete} />
        ))
      )}
    </MainLayout>
  );
}

export default BlogPage;
