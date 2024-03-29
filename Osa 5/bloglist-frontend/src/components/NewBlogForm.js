import { useState } from 'react'
import PropTypes from 'prop-types'


const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url:url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return  (
    <form onSubmit={addBlog}>
      <h2>Create a new blog</h2>
      <div>
      Title:
        <input
          type="text"
          value={title}
          name="Title"
          placeholder='Title of the blog'
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div>
      Author:
        <input
          type="text"
          value={author}
          name="Author"
          placeholder='Author of the blog'
          onChange={event => setAuthor(event.target.value)}
        />
      </div>
      <div>
      URL:
        <input
          type="text"
          value={url}
          name="Url"
          placeholder='URL of the blog'
          onChange={event => setUrl(event.target.value)}
        />
      </div>
      <button type="submit" data-testid="blogsubmit-button">Create a new blog</button>
    </form>
  )}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm