import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h1>ProductStore</h1>
      </div>
      <nav className="d-flex gap-4">
        <Link to="/">Home</Link> 
        <Link to="/products">Products</Link> 
      </nav>
    </div>
  );
}

export default Header;
