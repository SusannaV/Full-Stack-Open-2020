import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, updater, currentUser }) => {
  const [showDetails, setShowDetailsMore] = useState(false)
  const [updatedLikes, setUpdatedLikes] = useState(false)

  const toggleDetails = () => {
    setShowDetailsMore(!showDetails)
  }

  const addLikes = (event) => {
    event.preventDefault()
    blogService.addLikes(blog)
    setUpdatedLikes(!updatedLikes)
    updater()
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)){
      blogService.deleteBlog(blog)
        .then(() => {
          updater()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  if (!showDetails){
    return (
      <div className='blog'>
        {blog.title} by {blog.author} {blog.user.name}
        <button onClick={toggleDetails}>View details</button>
      </div>
    )} else {
    return (
      <div className='blog'>
      Title: {blog.title}  <button onClick={toggleDetails}>Hide details</button><br/>
      Author: {blog.author}<br/>
      Url: {blog.url}<br/>
      Likes: {blog.likes} <button onClick={addLikes}>Like</button><br/>
      Added by: {blog.user.name}
        {currentUser.id === blog.user.id && <button onClick={deleteBlog}>Remove</button>}

      </div>
    )
  }}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // updater: PropTypes.func.isRequired,
  // currentUser: PropTypes.object.isRequired
}

export default Blog
