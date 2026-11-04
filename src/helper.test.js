import React from 'react'
import { getValidChildren } from './helper'

describe('getValidChildren', () => {
  it.each([undefined, null, false, true, 'text', 42])(
    'returns no elements for %p',
    (children) => {
      expect(getValidChildren(children)).toEqual([])
    }
  )

  it('accepts a single element and preserves its props', () => {
    const children = getValidChildren(<div title='page'>Content</div>)

    expect(children).toHaveLength(1)
    expect(children[0].type).toBe('div')
    expect(children[0].props).toEqual({ title: 'page', children: 'Content' })
  })

  it('flattens arrays, removes non-elements and preserves element order', () => {
    const children = getValidChildren([
      <div key='first'>First</div>,
      null,
      'text',
      false,
      42,
      [<section key='second'>Second</section>]
    ])

    expect(children.map((child) => child.props.children)).toEqual([
      'First',
      'Second'
    ])
  })

  it('preserves fragments as elements without flattening their contents', () => {
    const children = getValidChildren(
      <React.Fragment>
        <div>First</div>
        <div>Second</div>
      </React.Fragment>
    )

    expect(children).toHaveLength(1)
    expect(children[0].type).toBe(React.Fragment)
  })
})
