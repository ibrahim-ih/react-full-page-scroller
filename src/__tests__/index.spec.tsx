import React, { act } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { render } from '@testing-library/react'
import FullPage from '../index'

describe('FullPage', () => {
  it('renders the scroller and page content', async () => {
    const { findByText } = render(
      <FullPage>
        <div>Full page content</div>
      </FullPage>
    )

    expect(await findByText('Full page content')).toBeInTheDocument()
  })

  it('hydrates server output without a markup mismatch', async () => {
    const element = (
      <FullPage>
        <div>Hydrated content</div>
      </FullPage>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(element)
    document.body.appendChild(container)
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    let root: ReturnType<typeof hydrateRoot> | undefined

    try {
      await act(async () => {
        root = hydrateRoot(container, element)
      })

      expect(container.textContent).toBe('Hydrated content')
      expect(consoleError).not.toHaveBeenCalled()
    } finally {
      const hydratedRoot = root
      if (hydratedRoot) {
        await act(async () => {
          hydratedRoot.unmount()
        })
      }
      container.remove()
      consoleError.mockRestore()
    }
  })
})
