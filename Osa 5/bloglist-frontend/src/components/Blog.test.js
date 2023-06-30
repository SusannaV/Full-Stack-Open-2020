import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Rendering blogs', () => {
  // eslint-disable-next-line no-unused-vars
  let container

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Authoripants',
    url: 'http://www.blog.blog',
    user: {
      name : 'nimi'
    }
  }

  const currenUser =
  { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…4MDF9.aLsODQ98E1lsbTQNBFTAM_olo0TaIlz_tb9Ots9BB2M',
    username: 'kayttaja1',
    name: 'Tämän käyttäjän salasana on salasana',
    id: '63d3f75e53f97e87e178449f' }


  const mockAddLikes = jest.fn()


  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        updater={jest.fn()}
        currentUser={currenUser}
        addLikes={mockAddLikes}
      />
    ).container
  })

  test('originally renders content and author but not URL or likes', () => {
    const blogElement = container.querySelector('.blog')
    expect(blogElement).toHaveTextContent('Component testing is done with react-testing-library')
    expect(blogElement).toHaveTextContent('Authoripants')

    const nonExistingUrl = screen.queryByText('http://www.blog.blog',  { exact: false })
    expect(nonExistingUrl).toBe(null)
    const nonExistingLikes = screen.queryByText('Likes:', { exact: false })
    expect(nonExistingLikes).toBe(null)
  })


  test('clicking the button opens details', async () => {
    const user = userEvent.setup()
    const button = screen.getByTestId('details-button')
    await user.click(button)

    const detailsElement = screen.getByText('Title:', { exact: false })
    expect(detailsElement).toBeInTheDocument()

    const blogElement = screen.getByText('Added by', { exact: false })
    expect(blogElement).toBeDefined()

    const hideButton = screen.getByText('Hide details')
    expect(hideButton).toBeInTheDocument()
    expect(button).not.toBeInTheDocument()
  })

  test('clicking the like button adds calls to mockAddLikes-function', async () => {
    const user = userEvent.setup()
    const detailsButton = screen.getByTestId('details-button')
    await user.click(detailsButton)

    const likeButton = screen.getByTestId('like-button')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockAddLikes.mock.calls).toHaveLength(2)
  })
})