import React, { act } from 'react'
import { Simulate } from 'react-dom/test-utils'
import Page from './Page'
import PageIndicator from './PageIndicator'
import PageNav from './PageNav'
import PageScroller from './PageScroller'
import { createRenderer } from './test-utils'

describe('PageScroller', () => {
  let renderer
  let scroller
  let bodyTop
  let originalHeight

  const dispatchScroll = (top) => {
    bodyTop = top
    act(() => {
      window.dispatchEvent(new window.Event('scroll'))
    })
  }

  const mountPages = (count = 3) => {
    scroller = renderer.render(
      <PageScroller>
        {Array.from({ length: count }, (_, index) => (
          <Page key={index}>
            <div>Page {index + 1}</div>
          </Page>
        ))}
      </PageScroller>
    )
  }

  beforeEach(() => {
    jest.useFakeTimers()
    originalHeight = window.innerHeight
    window.innerHeight = 600
    bodyTop = 0
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {})
    jest
      .spyOn(document.body, 'getBoundingClientRect')
      .mockImplementation(() => ({ top: bodyTop }))
    renderer = createRenderer()
  })

  afterEach(() => {
    renderer.unmount()
    window.innerHeight = originalHeight
    jest.clearAllTimers()
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('renders pages, counts only Page components and forwards wrapper props', () => {
    scroller = renderer.render(
      <PageScroller className='scroller' style={{ color: 'red' }}>
        {null}
        Text
        <div>Ignored element</div>
        <Page>
          <div>Only page</div>
        </Page>
      </PageScroller>
    )

    expect(scroller.pages).toBe(1)
    expect(renderer.container.firstChild.className).toBe('scroller')
    expect(renderer.container.firstChild.style.color).toBe('red')
    expect(renderer.container.textContent).toBe('Only page')
    expect(scroller.state.pageIndex).toBe(0)
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('renders without children and does not scroll', () => {
    scroller = renderer.render(<PageScroller />)
    dispatchScroll(-1)

    expect(scroller.pages).toBe(0)
    expect(renderer.container.firstChild.children).toHaveLength(0)
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('scrolls down one page and records its position', () => {
    mountPages()
    dispatchScroll(-1)

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 600)
    expect(scroller.state).toMatchObject({
      pageIndex: 1,
      scrollPos: -1,
      scrollAgain: false
    })
  })

  it('pins scrolling during the lock and releases it after exactly one second', () => {
    mountPages()
    dispatchScroll(-1)

    act(() => {
      jest.advanceTimersByTime(999)
    })
    dispatchScroll(-2)
    expect(scroller.state.pageIndex).toBe(1)
    expect(scroller.state.scrollAgain).toBe(false)
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 600)

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(scroller.state.scrollAgain).toBe(true)
    dispatchScroll(-3)
    expect(scroller.state.pageIndex).toBe(2)
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 1200)
  })

  it('scrolls up to the preceding page', () => {
    mountPages()
    dispatchScroll(-10)
    act(() => {
      jest.advanceTimersByTime(1000)
    })

    dispatchScroll(-5)

    expect(scroller.state.pageIndex).toBe(0)
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0)
  })

  it('does not scroll above the first page', () => {
    mountPages()
    dispatchScroll(1)

    expect(scroller.state.pageIndex).toBe(0)
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('does not scroll below the last page', () => {
    mountPages(1)
    dispatchScroll(-1)

    expect(scroller.state.pageIndex).toBe(0)
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('navigates directly using the current viewport height', () => {
    mountPages()
    window.innerHeight = 800
    act(() => {
      scroller.goToPage(2)
    })

    expect(scroller.state.pageIndex).toBe(2)
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 1600)
  })

  it('restarts the lock when another navigation occurs before it expires', () => {
    mountPages()
    act(() => {
      scroller.goToPage(1)
    })
    act(() => {
      jest.advanceTimersByTime(500)
      scroller.goToPage(2)
    })
    expect(jest.getTimerCount()).toBe(1)

    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(scroller.state.scrollAgain).toBe(false)

    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(scroller.state.scrollAgain).toBe(true)
  })

  it('registers its scroll listener and removes it on unmount', () => {
    const addListener = jest.spyOn(window, 'addEventListener')
    const removeListener = jest.spyOn(window, 'removeEventListener')
    mountPages()
    const handler = scroller.handleScroll

    expect(addListener).toHaveBeenCalledWith('scroll', handler)
    renderer.unmount()
    expect(removeListener).toHaveBeenCalledWith('scroll', handler)

    window.scrollTo.mockClear()
    dispatchScroll(-1)
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('cancels the pending scroll lock timer when unmounted', () => {
    mountPages()
    act(() => {
      scroller.goToPage(1)
    })
    expect(jest.getTimerCount()).toBe(1)

    renderer.unmount()

    expect(jest.getTimerCount()).toBe(0)
  })

  it('builds navigation only for titled pages and keeps their real indexes', () => {
    const pageNav = [
      { title: '' },
      { title: 'Second' },
      { title: 'Third', className: 'third', style: { color: 'red' } }
    ]
    scroller = renderer.render(
      <PageScroller>
        <PageNav />
        {pageNav.map((_, index) => (
          <Page key={index} pageNav={pageNav}>
            <div>Page {index + 1}</div>
          </Page>
        ))}
      </PageScroller>
    )

    const buttons = renderer.container.querySelector('.page-nav').children
    expect(buttons).toHaveLength(2)
    expect(buttons[0].textContent).toBe('Second')
    expect(buttons[0].className).toBe('page-nav-button')
    expect(buttons[1].className).toBe('third')
    expect(buttons[1].style.color).toBe('red')

    act(() => {
      Simulate.click(buttons[0])
    })
    expect(scroller.state.pageIndex).toBe(1)
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 600)
  })

  it('provides page count, active page and navigation to indicators', () => {
    scroller = renderer.render(
      <PageScroller>
        <PageIndicator
          indicatorStyle={{ width: '8px' }}
          indicatorStyleActive={{ width: '20px' }}
        />
        <Page>
          <div>First</div>
        </Page>
        <Page>
          <div>Second</div>
        </Page>
      </PageScroller>
    )

    const indicators = renderer.container.firstChild.lastChild.children
    expect(indicators).toHaveLength(2)
    expect(indicators[0].style.width).toBe('20px')

    act(() => {
      Simulate.click(indicators[1])
    })
    expect(scroller.state.pageIndex).toBe(1)
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 600)
    expect(indicators[0].style.width).toBe('8px')
    expect(indicators[1].style.width).toBe('20px')
  })

  it('supports indicators without custom styles', () => {
    renderer.render(
      <PageScroller>
        <PageIndicator />
        <Page>
          <div>Only page</div>
        </Page>
      </PageScroller>
    )

    const indicators = renderer.container.firstChild.lastChild.children
    expect(indicators).toHaveLength(1)
    expect(indicators[0].style.width).toBe('20px')
  })
})
