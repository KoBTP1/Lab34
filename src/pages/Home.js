import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center">
      <h5>Welcome to ProductStore</h5>
      <p>Manage and explore products for your needs.</p>
      <Link to="/products">
        <button type="button" className="btn btn-primary">
          View Products
        </button>
      </Link>
    </div>
  );
}

export default Home;
