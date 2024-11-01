import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className=" bg-white shadow-md sticky top-0 z-40">
        <span className=" block w-full bg-nodeGreen h-2"></span>
      <div className="container flex items-center py-2 px-6 justify-between">
        <div className="flex gap-4 items-center">
          <Link to="/">
            <img src="/images/icons/logo2.svg" className="w-20" alt="logo" />
          </Link>
        </div>
        <ul className="flex gap-4 m-0">
          <Link
            to="/"
            className="bg-jsYellow text-black font-bold px-3 py-1 no-underline relative hover:after:block hover:after:bg-nodeGreen hover:after:h-1 hover:after:w-full hover:after:absolute hover:after:left-0 hover:after:bottom-0"
          >
            Home
          </Link>
          <Link
            to="/blog"
            className="bg-jsYellow text-black font-bold px-3 py-1 no-underline relative hover:after:block hover:after:bg-nodeGreen hover:after:h-1 hover:after:w-full hover:after:absolute hover:after:left-0 hover:after:bottom-0"
          >
            Blog
          </Link>
          {isLoggedIn && (
            <Link
              onClick={handleLogout}
              className="bg-jsYellow text-black font-bold px-3 py-1 no-underline relative hover:after:block hover:after:bg-nodeGreen hover:after:h-1 hover:after:w-full hover:after:absolute hover:after:left-0 hover:after:bottom-0"
            >
              Logout
            </Link>
          )}
          <Link
            to="/"
            className="bg-jsYellow text-black font-bold px-3 py-1 no-underline relative hover:after:block hover:after:bg-nodeGreen hover:after:h-1 hover:after:w-full hover:after:absolute hover:after:left-0 hover:after:bottom-0"
          >
            Contact
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
