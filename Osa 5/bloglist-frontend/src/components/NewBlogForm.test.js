import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<NewBlogForm createBlog={createBlog} />)

  const blogInput = screen.getByPlaceholderText('Title of the blog')
  const authorgInput = screen.getByPlaceholderText('Author of the blog')
  const urlInput = screen.getByPlaceholderText('URL of the blog')
  const sendButton = screen.getByTestId('blogsubmit-button')

  await user.type(blogInput, 'testing a form...')
  await user.type(authorgInput, 'Authoring')
  await user.type(urlInput, 'www.url.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Authoring')
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].url).toBe('www.url.com')
})
