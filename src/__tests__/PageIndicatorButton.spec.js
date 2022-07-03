import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import PageIndicatorButton from '../PageIndicatorButton'

const props = {
  goToPage: jest.fn(),
  pageIndex: 1,
  active: true
}

describe('PageIndicatorButton Component', () => {
  it('displays correctly without props', () => {
    const { container } = render(<PageIndicatorButton />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        style="height: 8px; width: 8px; margin: 10px; border-radius: 4px; background-color: white; transition: width 500ms ease;"
      />
    `)
  })
  it('displays correctly with props', () => {
    const { container } = render(<PageIndicatorButton {...props} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        style="height: 8px; width: 20px; margin: 10px; border-radius: 4px; background-color: white; transition: width 500ms ease;"
      />
    `)
  })

  it('calls goToPage function when clicked', () => {
    const { container } = render(<PageIndicatorButton {...props} />)
    fireEvent.click(container.firstChild)
    expect(props.goToPage).toHaveBeenCalledTimes(1)
  })
})
