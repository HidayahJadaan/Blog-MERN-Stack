import React from "react";
import "./home.css";
import PostList from "../../components/posts/PostList";

import { categories, posts } from "../../dummyData";
import SideBar from "../../components/sidebar/SideBar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcom to blog</h1>
        </div>
      </div>

      <div className="home-latest-post">Latest Posts</div>

      <div className="home-container">
        <PostList posts={posts.slice(0, 3)} />
        <SideBar categories={categories} />
      </div>
      <div className="home-see-posts-link">
        <Link to='/posts' className="home-link">See All Posts</Link>
      </div>
    </section>
  );
}
