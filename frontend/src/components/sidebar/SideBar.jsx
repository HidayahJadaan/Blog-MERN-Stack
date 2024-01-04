import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

export default function SideBar({ categories }) {
  return (
    <div className="sidebar">
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories.map((category) => (
          <Link
            className="sidebar-link"
            key={category._id}
            to={`/posts/categories/${category.title}`}
          >
            {" "}
            {category.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}
