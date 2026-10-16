import React from "react";

export default function SearchBar({ value, onChange }) {
  return <input className="form-control" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Tìm tên sản phẩm..." />;
}
