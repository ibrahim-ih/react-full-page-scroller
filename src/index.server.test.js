/**
 * @jest-environment node
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import FullPage from '.'

describe('FullPage server rendering', () => {
  it('renders pages without accessing browser globals', () => {
    expect(typeof window).toBe('undefined')
    expect(
      renderToString(
        <FullPage>
          <div>Page</div>
        </FullPage>
      )
    ).toContain('<div style="height:100vh;width:100vw">Page</div>')
  })
})
