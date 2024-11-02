import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="/images/icons/logo2.svg" className="w-20" alt="logo" />
    </Link>
  );
}

export default Logo;
