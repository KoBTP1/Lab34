import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center">
      <h1>404 - Không tìm thấy trang</h1>

      <p>Trang bạn đang tìm kiếm không tồn tại.</p>

      <Link to="/" className="btn btn-primary">
        Về trang chủ
      </Link>
    </div>
  );
}

export default NotFound;
