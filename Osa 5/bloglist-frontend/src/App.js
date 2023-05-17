import { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if(message.includes('successfully')){
      return (
        <div className="success">
          {message}
        </div>)
    }
    else {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
  }

  const reFetchBlogs = () => {
    blogService.getAll()
      .then(blogs =>
        setBlogs( blogs )
      )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
      setErrorMessage(
        `A new blog ${blogObject.title} by ${blogObject.author} was added successfully!`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('error creating a new blog')
      console.log(exception)
      setErrorMessage(
        'The blog could not be added!'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    blogFormRef.current.toggleVisibility()
  }



  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <Togglable buttonLabel="Log in here">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in. <button onClick={handleLogOut}>Log out</button> </p>
      <Notification message={errorMessage} />
      <Togglable buttonLabel='Add a new blog' ref={blogFormRef}>
        <NewBlogForm
          createBlog ={addBlog} />
      </Togglable>
      {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updater={reFetchBlogs} currentUser={user}/>
      )}
    </div>
  )
}

export default App