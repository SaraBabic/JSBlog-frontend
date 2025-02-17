import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NavLink from "./atoms/NavLink";
import Logo from "./molecules/Logo";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className=" sticky top-0 z-40 bg-bgGray shadow-md">
      <div className="container flex items-center py-4 px-6 justify-between">
        <Logo />
        <ul className="flex gap-4 m-0">
          <NavLink path="/" linkText="Home" />
          <NavLink path="/blog" linkText="Blog" />
          {isLoggedIn && (
            <NavLink linkText="Logout" handle={handleLogout} />
          )}
          <NavLink linkText="Contact" path="/" />
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
