import React from "react";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";

function MainLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <div className=" bg-bgGray text-white">
        <Navbar />
        <div className="container my-10">{children}</div>
        </div>
      </AuthProvider>
    </>
  );
}

export default MainLayout;
