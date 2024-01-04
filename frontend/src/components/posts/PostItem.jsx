import React from 'react'
import {Link} from 'react-router-dom'


export default function PostItem({ post }) {
  return (
    <div className='post-item'>
<div className="post-item-image-wrapper">
  <img src={post.image} alt={post.title} className='post-item-image' />
</div>
<div className="post-item-info-wrapper">
  <div className="post-item-info">
    <div className="post-item-author">
      <strong>Author: </strong>
      <Link className='post-item-username' to='/profile/:id'>{post.user.username}</Link>
    </div>
    <div className="post-item-date">
      {new Date(post.createdAt).toDateString()}
    </div>
  </div>
  <div className="post-item-details">

    <h4 className="post-item-title">{post.title}</h4>
    <Link className='post-item-category' to={`posts/categories/${post.category}`}> 
    {post.category}
    
    </Link>
  </div>
<p className="post-item-description">
  {post.description}
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia unde eligendi vero magni fugit, fugiat sit 
  animi eum expedita beatae ut ea quod suscipit voluptas atque deleniti amet similique cupiditate.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia unde eligendi vero magni fugit, fugiat sit 
  animi eum expedita beatae ut ea quod suscipit voluptas atque deleniti amet similique cupiditate.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia unde eligendi vero magni fugit, fugiat sit 
  animi eum expedita beatae ut ea quod suscipit voluptas atque deleniti amet similique cupiditate.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia unde eligendi vero magni fugit, fugiat sit 
  animi eum expedita beatae ut ea quod suscipit voluptas atque deleniti amet similique cupiditate.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia unde eligendi vero magni fugit, fugiat sit 
  animi eum expedita beatae ut ea quod suscipit voluptas atque deleniti amet similique cupiditate.

</p>
<Link className='post-item-link' to={`/posts/details/${post._id}`} >
  Read more...
  
  </Link>
</div>
    </div>
  )
}