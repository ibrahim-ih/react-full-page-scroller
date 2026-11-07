import React from 'react'
import { render, screen } from '@testing-library/react'
import Page from '../Page'

describe('Page', () => {
  it('renders child content and applies page sizing', () => {
    const { container } = render(
      <Page>
        <section className='content' style={{ color: 'red' }}>
          <h1>Page content</h1>
        </section>
      </Page>
    )

    expect(container.firstElementChild).toHaveClass('content')
    expect(container.firstElementChild).toHaveStyle({
      height: '100vh',
      width: '100vw',
      color: 'rgb(255, 0, 0)'
    })
    expect(screen.getByRole('heading', { name: 'Page content' })).toBeVisible()
  })

  it('renders non-element children', () => {
    render(<Page>Text content</Page>)
    expect(screen.getByText('Text content')).toBeVisible()
  })
})
