import { useState } from 'react';
import blogService from '../services/blogs'


const Blog = ({blog}) => {
const [showDetails, setShowDetailsMore] = useState(false)
const [updatedLikes, setUpdatedLikes] = useState(false)

const toggleDetails = () => {
  setShowDetailsMore(!showDetails)
}

const addLikes = (event) => {
  event.preventDefault()
  blogService.addLikes(blog)
  setUpdatedLikes(!updatedLikes)
}

if (!showDetails){
return (
  <div className='blog'>
    {blog.title} by {blog.author}
    <button onClick={toggleDetails}>View</button>
  </div>  
)} else {
  return (
    <div className='blog'>
      Title: {blog.title} <br/>
      Author: {blog.author}<br/>
      Url: {blog.url}<br/>
      Likes: {blog.likes} <button onClick={addLikes}>Like</button><br/> 
      Added by: {blog.user.name}
      <button onClick={toggleDetails}>Hide</button>
    </div>  
  )
}}

export default Blog