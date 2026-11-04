import React from 'react'
import { renderToString } from 'react-dom/server'
import FullPage from '.'

describe('FullPage server rendering', () => {
  it('returns no markup without accessing browser globals', () => {
    const windowDescriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      'window'
    )
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: undefined
    })

    try {
      expect(typeof window).toBe('undefined')
      expect(
        renderToString(
          <FullPage>
            <div>Page</div>
          </FullPage>
        )
      ).toBe('')
    } finally {
      Object.defineProperty(globalThis, 'window', windowDescriptor)
    }
  })
})
