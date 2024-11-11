import React, { useContext } from "react";
import Moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../atoms/Button";

function BlogTeaser({ article, onDelete }) {
  const { isLoggedIn } = useContext(AuthContext);
  Moment.locale("en");

  return (
    <div className="p-4 shadow-xl  my-20" key={article._id}>
      <div className="flex mb-4 gap-4 md:gap-20 flex-col-reverse md:flex-row">
        <div className="flex flex-col justify-between md:w-2/3">
        <div className="">
        <div className=" text-white">
            {Moment(article.createdAt).format("D MMM Y")}
          </div>
          <h4 className="">{article.title}</h4>
          <div className="">{article.description}</div>
        </div>
          
          <Button path={`${article.slug}`} />
        </div>

        {/* Render the image if it exists */}
        {article.imagePath && (
          <div className=" md:w-1/3 flex">
            <img
              src={`/${article.imagePath}`}
              alt={article.title}
              className=" object-cover aspect-video md:aspect-square"
            />
          </div>
        )}
      </div>
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
  );
}

export default BlogTeaser;
