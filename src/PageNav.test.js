import React from 'react'
import { fireEvent } from '@testing-library/react'
import PageNav from './PageNav'
import { createRenderer } from './test-utils'

describe('PageNav', () => {
  let renderer

  beforeEach(() => {
    renderer = createRenderer()
  })

  afterEach(() => {
    renderer.unmount()
  })

  it('renders an empty navigation container by default', () => {
    renderer.render(<PageNav />)

    expect(renderer.container.firstChild.className).toBe('page-nav')
    expect(renderer.container.firstChild.children).toHaveLength(0)
  })

  it('renders titles, default classes and custom button styles in order', () => {
    renderer.render(
      <PageNav
        navButtons={[
          { index: 0, title: 'First' },
          {
            index: 2,
            title: 'Third',
            className: 'custom-nav',
            style: { color: 'red' }
          }
        ]}
      />
    )

    const buttons = renderer.container.firstChild.children
    expect(Array.from(buttons, (button) => button.textContent)).toEqual([
      'First',
      'Third'
    ])
    expect(buttons[0].className).toBe('page-nav-button')
    expect(buttons[1].className).toBe('custom-nav')
    expect(buttons[1].style.color).toBe('red')
  })

  it('navigates to the configured page index, not the button position', () => {
    const goToPage = jest.fn()
    renderer.render(
      <PageNav
        goToPage={goToPage}
        navButtons={[{ index: 4, title: 'Fifth' }]}
      />
    )

    fireEvent.click(renderer.container.querySelector('.page-nav-button'))

    expect(goToPage).toHaveBeenCalledTimes(1)
    expect(goToPage).toHaveBeenCalledWith(4)
  })

  it('supports buttons without a navigation callback', () => {
    renderer.render(<PageNav navButtons={[{ index: 0, title: 'First' }]} />)

    expect(() =>
      fireEvent.click(renderer.container.querySelector('.page-nav-button'))
    ).not.toThrow()
  })
})
