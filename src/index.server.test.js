/** @jest-environment node */
import React from 'react'
import { renderToString } from 'react-dom/server'
import FullPage from './index'

describe('FullPage server rendering', () => {
  it('renders no markup when window is unavailable', () => {
    const markup = renderToString(
      <FullPage>
        <div>Page content</div>
      </FullPage>
    )

    expect(markup).toBe('')
  })
})
