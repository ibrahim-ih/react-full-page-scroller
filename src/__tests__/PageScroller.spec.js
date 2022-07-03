import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import PageScroller from '../PageScroller'

// TODO: a fixer
const props = {
  pageCount: 1,
  activePage: 0,
  goToPage: jest.fn(),
  style: {},
  indicatorStyle: {
    height: '8px',
    width: '8px',
    margin: '10px',
    borderRadius: '4px',
    backgroundColor: 'white',
    transition: 'width 500ms ease'
  },
  indicatorStyleActive: { width: '20px' }
}

// mock PageNav
const PageNav = () => {
  return (
    <div>
      <div>PageNav</div>
    </div>
  )
}

// mock Page
const Page = () => {
  return (
    <div>
      <div>Page</div>
    </div>
  )
}

// mock PageIndicator
const PageIndicator = () => {
  return (
    <div>
      <div>PageIndicator</div>
    </div>
  )
}

// mock PageIndicatorButton
const PageIndicatorButton = () => {
  return (
    <div>
      <div>PageIndicatorButton</div>
    </div>
  )
}

// mock PageIndicatorButtonActive
const PageIndicatorButtonActive = () => {
  return (
    <div>
      <div>PageIndicatorButtonActive</div>
    </div>
  )
}

// mock PageIndicatorButtonDisabled
const PageIndicatorButtonDisabled = () => {
  return (
    <div>
      <div>PageIndicatorButtonDisabled</div>
    </div>
  )
}

describe('PageScroller Component', () => {
  it('displays correctly without props', () => {
    const { container } = render(<PageScroller />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        indicatorstyle="[object Object]"
        indicatorstyleactive="[object Object]"
        navbuttons=""
        pageindex="0"
      />
    `)
  })
  it('displays correctly with props', () => {
    const { container } = render(<PageScroller {...props} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        activepage="0"
        indicatorstyle="[object Object]"
        indicatorstyleactive="[object Object]"
        navbuttons=""
        pagecount="1"
        pageindex="0"
      />
    `)
  })

})
