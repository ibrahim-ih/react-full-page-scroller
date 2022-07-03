import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import PageIndicator from '../PageIndicator'

// mock props
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

describe('PageIndicator Component', () => {
  it('displays correctly without props', () => {
    const { container } = render(<PageIndicator />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        style="height: 100vh; position: fixed; display: flex; flex-direction: column; justify-content: center;"
      >
        <div
          style="height: 8px; width: 20px; margin: 10px; border-radius: 4px; background-color: white; transition: width 500ms ease;"
        />
      </div>
    `)
  })
  it('displays correctly with props', () => {
    const { container } = render(<PageIndicator {...props} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        style="height: 100vh; position: fixed; display: flex; flex-direction: column; justify-content: center;"
      >
        <div
          style="height: 8px; width: 20px; margin: 10px; border-radius: 4px; background-color: white; transition: width 500ms ease;"
        />
      </div>
    `)
  })
})
