import React from "react";

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <select className="form-select" value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="all">All Category</option>
      {categories.map((category) => <option key={category} value={category}>{category}</option>)}
    </select>
  );
}

