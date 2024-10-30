import React from "react";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";

function MainLayout({ children }) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <div className="container my-10">{children}</div>
      </AuthProvider>
    </>
  );
}

export default MainLayout;
