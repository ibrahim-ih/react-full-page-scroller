/**
 * @jest-environment node
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import FullPage from '.'

describe('FullPage server rendering', () => {
  it('returns no markup without accessing browser globals', () => {
    expect(typeof window).toBe('undefined')
    expect(
      renderToString(
        <FullPage>
          <div>Page</div>
        </FullPage>
      )
    ).toBe('')
  })
})
