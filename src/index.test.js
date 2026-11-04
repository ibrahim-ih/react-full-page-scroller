import React from 'react'
import { act } from 'react'
import { Simulate } from 'react-dom/test-utils'
import FullPage, { FullPage as NamedFullPage } from '.'
import { createRenderer } from './test-utils'

describe('FullPage', () => {
  let renderer

  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {})
    renderer = createRenderer()
  })

  afterEach(() => {
    renderer.unmount()
    jest.clearAllTimers()
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('exports the same component as the default and named export', () => {
    expect(FullPage).toBe(NamedFullPage)
  })

  it('renders every page and the default indicator in a full viewport column', () => {
    renderer.render(
      <FullPage>
        <section className='first' style={{ color: 'red' }}>
          First
        </section>
        <section>Second</section>
      </FullPage>
    )

    const scroller = renderer.container.firstChild
    expect(scroller.style.display).toBe('flex')
    expect(scroller.style.flexDirection).toBe('column')
    expect(scroller.children).toHaveLength(3)
    expect(scroller.children[0].className).toBe('first')
    expect(scroller.children[0].style.color).toBe('red')
    Array.from(scroller.children)
      .slice(0, 2)
      .forEach((page) => {
        expect(page.style.height).toBe('100vh')
        expect(page.style.width).toBe('100vw')
      })
    expect(scroller.children[2].children).toHaveLength(2)
    expect(scroller.textContent).toBe('FirstSecond')
    expect(scroller.querySelector('.page-nav')).toBeNull()
  })

  it('supports a single child and ignores conditional empty children', () => {
    renderer.render(
      <FullPage>
        {null}
        {false}
        <div>Only page</div>
      </FullPage>
    )

    expect(renderer.container.firstChild.children).toHaveLength(2)
    expect(renderer.container.textContent).toBe('Only page')
  })

  it('supports no pages and an empty navigation configuration', () => {
    renderer.render(<FullPage pageNav={[]}>{[]}</FullPage>)

    expect(renderer.container.firstChild.children).toHaveLength(1)
  })

  it('navigates using configured buttons and updates the active indicator', () => {
    renderer.render(
      <FullPage
        pageNav={[
          { id: 1, title: 'Start' },
          {
            id: 2,
            title: 'End',
            className: 'last-page',
            style: { color: 'blue' }
          }
        ]}
        indicatorStyle={{ width: '8px' }}
        indicatorStyleActive={{ width: '20px' }}
      >
        <div>First</div>
        <div>Second</div>
      </FullPage>
    )

    const scroller = renderer.container.firstChild
    const indicators = scroller.children[2].children
    expect(indicators).toHaveLength(2)
    expect(indicators[0].style.width).toBe('20px')
    expect(scroller.querySelector('.last-page').style.color).toBe('blue')

    act(() => {
      Simulate.click(scroller.querySelector('.last-page'))
    })

    expect(window.scrollTo).toHaveBeenLastCalledWith(0, window.innerHeight)
    expect(indicators[0].style.width).toBe('8px')
    expect(indicators[1].style.width).toBe('20px')

    act(() => {
      jest.advanceTimersByTime(1000)
      Simulate.click(indicators[0])
    })

    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0)
    expect(indicators[0].style.width).toBe('20px')
    expect(indicators[1].style.width).toBe('8px')
  })

  it('uses the default indicator style when only an active style is provided', () => {
    renderer.render(
      <FullPage indicatorStyleActive={{ width: '20px' }}>
        <div>Only page</div>
      </FullPage>
    )

    expect(renderer.container.firstChild.children).toHaveLength(2)
    expect(
      renderer.container.firstChild.children[1].firstChild.style.width
    ).toBe('20px')
  })
})
