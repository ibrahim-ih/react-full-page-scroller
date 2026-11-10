import React from 'react'
import { fireEvent } from '@testing-library/react'
import PageIndicatorButton from './PageIndicatorButton'
import { createRenderer } from './test-utils'

describe('PageIndicatorButton', () => {
  let renderer

  beforeEach(() => {
    renderer = createRenderer()
  })

  afterEach(() => {
    renderer.unmount()
  })

  it('renders the default inactive style', () => {
    renderer.render(<PageIndicatorButton />)

    const { style } = renderer.container.firstChild
    expect(style.height).toBe('8px')
    expect(style.width).toBe('8px')
    expect(style.backgroundColor).toBe('white')
    expect(style.borderRadius).toBe('4px')
  })

  it('merges the active style over the base style', () => {
    renderer.render(
      <PageIndicatorButton
        active
        indicatorStyle={{ width: '10px', height: '5px', color: 'red' }}
        indicatorStyleActive={{ width: '30px', color: 'blue' }}
      />
    )

    const { style } = renderer.container.firstChild
    expect(style.width).toBe('30px')
    expect(style.height).toBe('5px')
    expect(style.color).toBe('blue')
  })

  it('does not apply active styles to an inactive button', () => {
    renderer.render(
      <PageIndicatorButton
        indicatorStyle={{ width: '10px' }}
        indicatorStyleActive={{ width: '30px' }}
      />
    )

    expect(renderer.container.firstChild.style.width).toBe('10px')
  })

  it('updates styles when only the active flag changes', () => {
    const indicatorStyle = { width: '10px' }
    const indicatorStyleActive = { width: '30px' }
    const renderButton = (active) =>
      renderer.render(
        <PageIndicatorButton
          active={active}
          indicatorStyle={indicatorStyle}
          indicatorStyleActive={indicatorStyleActive}
        />
      )

    renderButton(false)
    expect(renderer.container.firstChild.style.width).toBe('10px')
    renderButton(true)
    expect(renderer.container.firstChild.style.width).toBe('30px')
    renderButton(false)
    expect(renderer.container.firstChild.style.width).toBe('10px')
  })

  it('updates when the base and active style props change', () => {
    renderer.render(
      <PageIndicatorButton active indicatorStyleActive={{ width: '25px' }} />
    )
    expect(renderer.container.firstChild.style.width).toBe('25px')

    renderer.render(
      <PageIndicatorButton
        active
        indicatorStyle={{ height: '12px' }}
        indicatorStyleActive={{ width: '40px' }}
      />
    )
    expect(renderer.container.firstChild.style.width).toBe('40px')
    expect(renderer.container.firstChild.style.height).toBe('12px')
    expect(renderer.container.firstChild.style.backgroundColor).toBe('')
  })

  it.each([0, 3])(
    'passes page index %i to the callback on click',
    (pageIndex) => {
      const goToPage = jest.fn()
      renderer.render(
        <PageIndicatorButton pageIndex={pageIndex} goToPage={goToPage} />
      )

      fireEvent.click(renderer.container.firstChild)

      expect(goToPage).toHaveBeenCalledTimes(1)
      expect(goToPage).toHaveBeenCalledWith(pageIndex)
    }
  )
})
