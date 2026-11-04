import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import PageIndicatorButton from '../PageIndicatorButton'

describe('PageIndicatorButton', () => {
  it('renders the default style', () => {
    const { container } = render(<PageIndicatorButton />)
    expect(container.firstElementChild).toHaveStyle({
      height: '8px',
      width: '8px'
    })
  })

  it('applies the active style and navigates to its page', () => {
    const goToPage = jest.fn()
    const { container } = render(
      <PageIndicatorButton
        active
        pageIndex={2}
        goToPage={goToPage}
        indicatorStyle={{ width: '8px' }}
        indicatorStyleActive={{ width: '20px' }}
      />
    )

    expect(container.firstElementChild).toHaveStyle({ width: '20px' })
    fireEvent.click(container.firstElementChild!)
    expect(goToPage).toHaveBeenCalledWith(2)
  })
})
