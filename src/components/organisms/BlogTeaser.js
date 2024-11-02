import React, { useContext } from 'react'
import Moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from '../atoms/Button';

function BlogTeaser( {article, onDelete} ) {

    const { isLoggedIn } = useContext(AuthContext);
    Moment.locale("en");

  return (
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
              <Button path={`${article.slug}`} />
              {isLoggedIn && (
                <>
                  <Link to={`edit/${article._id}`} className="btn btn-info">
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(article._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </>
              )}
            
          </div>
  )
}

export default BlogTeaser