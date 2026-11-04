import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import PageNav from '../PageNav'

describe('PageNav', () => {
  it('renders navigation buttons and responds to clicks', () => {
    const goToPage = jest.fn()
    render(
      <PageNav
        goToPage={goToPage}
        navButtons={[
          { index: 0, title: 'Page 1' },
          { index: 1, title: 'Page 2', className: 'custom-nav' }
        ]}
      />
    )

    fireEvent.click(screen.getByText('Page 1'))
    fireEvent.click(screen.getByText('Page 2'))

    expect(goToPage).toHaveBeenNthCalledWith(1, 0)
    expect(goToPage).toHaveBeenNthCalledWith(2, 1)
    expect(screen.getByText('Page 2')).toHaveClass('custom-nav')
  })
})
