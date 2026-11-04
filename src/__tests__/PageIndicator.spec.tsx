import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import PageIndicator from '../PageIndicator'

describe('PageIndicator', () => {
  it('renders an active indicator for each page', () => {
    const { container } = render(<PageIndicator pageCount={2} activePage={1} />)

    expect(container.firstElementChild?.children).toHaveLength(2)
    expect(container.firstElementChild?.children[1]).toHaveStyle({
      width: '20px'
    })
  })

  it('navigates to the selected page', () => {
    const goToPage = jest.fn()
    const { container } = render(
      <PageIndicator pageCount={2} goToPage={goToPage} />
    )

    fireEvent.click(container.firstElementChild!.children[1])
    expect(goToPage).toHaveBeenCalledWith(1)
  })
})
