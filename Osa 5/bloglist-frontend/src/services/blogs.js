import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLikes = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const blogUrl = baseUrl+`/${blog.id}`
  blog.likes = blog.likes+1
  const response = await axios.put(blogUrl, blog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const blogUrl = baseUrl+`/${blog.id}`
  const response = await axios.delete(blogUrl, config)
  return response.data
}

export default { getAll, create, setToken, addLikes, deleteBlog }