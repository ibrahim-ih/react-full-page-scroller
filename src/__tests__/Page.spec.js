import React from 'react'
import { render } from '@testing-library/react'
import Page from '../Page'

const props = {
  style: { width: '100%' },
  parent: {
      props: {
        children: ['mock-children'],
        className: 'mock-class-name',
        style: {width: 'mock-parent-style'}
      }
  }
}

describe('hello world', () => {
  it('displays correctly without props', () => {
    const { container } = render(<Page />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        style="height: 100vh; width: 100vw;"
      />
    `)
  })
  it('displays correctly with props', () => {
    const { container } = render(<Page {...props} />)
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        style="height: 100vh; width: 100vw;"
      />
    `)
  })
})
