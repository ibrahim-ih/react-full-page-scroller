import React, { act } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

jest.mock('react-syntax-highlighter', () => {
  const PrismLight = Object.assign(
    ({ children }: { children: React.ReactNode }) => children,
    { registerLanguage: jest.fn() }
  )

  return { PrismLight }
})
jest.mock('react-syntax-highlighter/dist/esm/languages/prism/javascript', () =>
  jest.fn()
)

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })

it('renders without crashing', async () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)

  try {
    await act(async () => {
      root.render(<App />)
    })

    expect(container.textContent).toContain('React Full Page Scroller')
  } finally {
    await act(async () => {
      root.unmount()
    })
    container.remove()
  }
})
