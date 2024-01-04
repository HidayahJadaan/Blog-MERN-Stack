import React, { useState } from "react";
import './header.css'

export default function Header() {
    const [toggleMenu, setToggleMenu] = useState(false)
  
    return (

    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <strong>Blog</strong>
          <i class="bi bi-pencil"></i>
        </div>

          <div className="header-menu" onClick={()=>setToggleMenu(prev=> !prev)} >
           {toggleMenu ?  <i className="bi bi-x-lg"></i>: <i className="bi bi-list"></i>}
          </div>
      </div>
      <nav style={{ clipPath: toggleMenu && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} className="navbar">
        <ul className="nav-links">
          <li  onClick={()=>setToggleMenu(false)} className="nav-link">
            <i className="bi bi-house">Home</i>
          </li>
          <li onClick={()=>setToggleMenu(false)} className="nav-link">
            <i className="bi bi-stickies">Posts</i>
          </li>
          <li onClick={()=>setToggleMenu(false)} className="nav-link">
            <i className="bi bi-journal">Create</i>
          </li>

          <li onClick={()=>setToggleMenu(false)} className="nav-link">
            <i className="bi bi-person-check">Admin Dashboard</i>
          </li>
        </ul>
      </nav>

      <div className="header-right">
        <button className="header-right-link">
          <i className="bi bi-box-arrow-in-right"></i>
          <span>Login</span>
        </button>
        <button className="header-right-link">
          <i className="bi bi-person-plus"></i>
          <span>Register</span>
        </button>
      </div>
    </header>
  );
}
