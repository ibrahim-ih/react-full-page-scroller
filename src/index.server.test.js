import React from 'react'
import { renderToString } from 'react-dom/server'
import FullPage from '.'

describe('FullPage server rendering', () => {
  it.each([false, true])(
    'renders page content without browser globals (navigation: %s)',
    (withNavigation) => {
      const descriptors = ['window', 'document'].map((name) => [
        name,
        Object.getOwnPropertyDescriptor(globalThis, name)
      ])
      descriptors.forEach(([name]) => {
        Object.defineProperty(globalThis, name, {
          configurable: true,
          get() {
            throw new Error(`Server rendering accessed ${name}`)
          }
        })
      })

      try {
        const markup = renderToString(
          <FullPage
            pageNav={
              withNavigation ? [{ title: 'Start' }, { title: 'End' }] : []
            }
          >
            {null}
            {false}
            <section className='first'>
              <h1>First page</h1>
            </section>
            <section>Second page</section>
          </FullPage>
        )

        expect(markup).toContain('<h1>First page</h1>')
        expect(markup).toContain('Second page')
        expect(markup).toContain('height:100vh;width:100vw')
        expect(markup.includes('page-nav')).toBe(withNavigation)
        expect(markup.includes('Start')).toBe(withNavigation)
        expect(markup.includes('End')).toBe(withNavigation)
      } finally {
        descriptors.forEach(([name, descriptor]) => {
          Object.defineProperty(globalThis, name, descriptor)
        })
      }
    }
  )

  it('renders an empty scroller when no pages are provided', () => {
    expect(renderToString(<FullPage />)).toBe(
      '<div style="display:flex;flex-direction:column"><div style="height:100vh;position:fixed;display:flex;flex-direction:column;justify-content:center"></div></div>'
    )
  })
})
