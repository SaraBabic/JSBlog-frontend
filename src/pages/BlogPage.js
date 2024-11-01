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
          <div className="p-4 border-2 border-nodeGreen my-4" key={article._id}>
            <div className="flex mb-4">
              <div className="flex-1">
              <div className=" opacity-70">
                {Moment(article.createdAt).format("D MMM Y")}
              </div>
              <h4 className="">{article.title}</h4>
              <div className="">{article.description}</div>
              </div>

              {/* Render the image if it exists */}
              {article.imagePath && (
                <div className="flex-1 flex justify-end h-full">
                  <img
                    src={`/${article.imagePath}`}
                    alt={article.title}
                    className=" object-cover h-full max-h-20"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  </div>
                )}
              </div>
              <Link to={`${article.slug}`} className="bg-nodeGreen text-black no-underline py-2 px-4 font-bold relative hover:after:block hover:after:bg-jsYellow hover:after:h-1 hover:after:w-full hover:after:absolute hover:after:left-0 c">
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
        ))
      )}
    </MainLayout>
  );
}

export default BlogPage;
