import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import PageNav from '../PageNav'

// mock props
const props = {
  navButtons: [
    {
      index: 0,
      title: 'Page 1',
      className: 'page-nav-button',
      style: {}
    },
    {
      index: 1,
      title: 'Page 2',
      className: 'page-nav-button',
      style: {}
    }
  ],
  goToPage: jest.fn()
}

describe('PageNav Component', () => {
  it('displays correctly without props', () => {
    const { container } = render(<PageNav />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="page-nav"
      />
    `)
  })
  it('displays correctly with props', () => {
    const { container } = render(<PageNav />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="page-nav"
      />
    `)
  })
  // test for each button
  it('displays each button', () => {
    const { container } = render(<PageNav {...props} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="page-nav"
      >
        <div
          class="page-nav-button"
        >
          Page 1
        </div>
        <div
          class="page-nav-button"
        >
          Page 2
        </div>
      </div>
    `)
  })
})
