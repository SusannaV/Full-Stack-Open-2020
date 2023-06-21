import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Authoripants',
    url: 'http://www.blog.blog',
    user: {
      name : 'nimi'
    }
  }

  render(<Blog blog={blog} />)

  const blogElement = screen.getByText('Component testing is done with react-testing-library',  { exact: false })
  expect(blogElement).toBeDefined()
  const nonExistingUrl = screen.queryByText('http://www.blog.blog',  { exact: false })
  expect(nonExistingUrl).toBe(null)
})