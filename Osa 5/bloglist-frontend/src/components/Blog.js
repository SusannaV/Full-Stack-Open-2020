import { useState } from 'react';


const Blog = ({blog}) => {
const [showDetails, setShowDetailsMore] = useState(false)

const toggleDetails = () => {
  setShowDetailsMore(!showDetails)
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
      Likes: {blog.likes} <button>Like</button><br/> 
      Added by: {blog.user.name}
      <button onClick={toggleDetails}>Hide</button>
    </div>  
  )
}}

export default Blog