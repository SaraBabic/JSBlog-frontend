import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Moment from "moment";
import MainLayout from "../layout/MainLayout";

function BlogSinglePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data);
      });
  }, [slug]);
  console.log("sjdifsjf :::", article);
  return (
    <MainLayout>
      {!article ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="container mt-4">
            <h1>{article.title}</h1>
            <p className="">
              {Moment(article.createdAt).format("D MMM YYYY")}
            </p>
            <p>{article.markdown}</p>
            {article.imagePath && (
              <div className="form-group">
                <img
                  src={`/${article.imagePath}`}
                  alt="Current Article"
                  style={{ maxWidth: "200px", margin: "10px 0" }}
                />
              </div>
            )}
          </div>
          {article.sections.length > 0
            ? article.sections.map((section, index) => {
                if (section.type === "text") {
                  return <p key={index}>{section.content}</p>;
                } else if (section.type === "image") {
                  return (
                    <img
                      key={index}
                      src={section.content}
                      alt={`${index + 1}`}
                    />
                  );
                }
                return null;
              })
            : null}
        </>
      )}
    </MainLayout>
  );
}

export default BlogSinglePage;
