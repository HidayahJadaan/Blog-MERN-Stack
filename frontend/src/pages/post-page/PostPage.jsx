import React, { useEffect } from 'react'
import './post-page.css'
import PostList from '../../components/posts/PostList'
import Sidebar from '../../components/sidebar/SideBar'
import {posts, categories} from '../../dummyData'
import Pagination from '../../components/pagination/Pagination'

export default function PostPage() {
  
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  
  return (
<>
<section className='posts-page'>
  <PostList posts={posts} />
  <Sidebar categories={categories} />
</section>
<Pagination />
</>
    );
}
