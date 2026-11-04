import React from 'react'
import { Simulate } from 'react-dom/test-utils'
import PageIndicator from './PageIndicator'
import { createRenderer } from './test-utils'

describe('PageIndicator', () => {
  let renderer

  beforeEach(() => {
    renderer = createRenderer()
  })

  afterEach(() => {
    renderer.unmount()
  })

  it('renders one active indicator by default using zero-based page indexes', () => {
    renderer.render(<PageIndicator />)

    expect(renderer.container.firstChild.children).toHaveLength(1)
    expect(renderer.container.firstChild.firstChild.style.width).toBe('20px')
  })

  it('supports indicator clicks without a navigation callback', () => {
    renderer.render(<PageIndicator />)

    expect(() =>
      Simulate.click(renderer.container.firstChild.firstChild)
    ).not.toThrow()
  })

  it('renders no indicators for an empty page list', () => {
    renderer.render(<PageIndicator pageCount={0} />)

    expect(renderer.container.firstChild.children).toHaveLength(0)
  })

  it('applies active styles only to the zero-based active page', () => {
    renderer.render(
      <PageIndicator
        pageCount={3}
        activePage={1}
        indicatorStyle={{ width: '8px' }}
        indicatorStyleActive={{ width: '20px' }}
      />
    )

    expect(
      Array.from(
        renderer.container.firstChild.children,
        (button) => button.style.width
      )
    ).toEqual(['8px', '20px', '8px'])
  })

  it('keeps its fixed layout while preserving unrelated custom styles', () => {
    renderer.render(
      <PageIndicator
        pageCount={1}
        style={{ color: 'red', position: 'absolute', height: '10px' }}
      />
    )

    const { style } = renderer.container.firstChild
    expect(style.color).toBe('red')
    expect(style.position).toBe('fixed')
    expect(style.height).toBe('100vh')
    expect(style.display).toBe('flex')
    expect(style.flexDirection).toBe('column')
    expect(style.justifyContent).toBe('center')
  })

  it('wires each indicator to its own page index', () => {
    const goToPage = jest.fn()
    renderer.render(<PageIndicator pageCount={3} goToPage={goToPage} />)

    Array.from(renderer.container.firstChild.children).forEach((button) => {
      Simulate.click(button)
    })

    expect(goToPage.mock.calls).toEqual([[0], [1], [2]])
  })

  it('updates the count and active page on rerender', () => {
    const props = {
      indicatorStyle: { width: '8px' },
      indicatorStyleActive: { width: '20px' }
    }
    renderer.render(<PageIndicator {...props} pageCount={3} activePage={0} />)
    expect(renderer.container.firstChild.children[0].style.width).toBe('20px')

    renderer.render(<PageIndicator {...props} pageCount={2} activePage={1} />)

    const buttons = renderer.container.firstChild.children
    expect(buttons).toHaveLength(2)
    expect(buttons[0].style.width).toBe('8px')
    expect(buttons[1].style.width).toBe('20px')
  })
})
