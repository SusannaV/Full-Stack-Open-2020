import {useState} from 'react';


const NewBlogForm = ({createBlog}) =>{ 
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
        onChange={event => setTitle(event.target.value)}
      />
    </div>
    <div>
      Author:
        <input
        type="text"
        value={author}
        name="Author"
        onChange={event => setAuthor(event.target.value)}
      />
    </div>
    <div>
      URL:
        <input
        type="text"
        value={url}
        name="Url"
        onChange={event => setUrl(event.target.value)}
      />
    </div>
    <button type="submit">Create a new blog</button>
  </form> 
)}

export default NewBlogForm;