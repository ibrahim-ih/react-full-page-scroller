import React, { act } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import FullPage from '../index'

describe('FullPage hydration', () => {
  let container
  let root

  beforeEach(() => {
    jest.useFakeTimers()
    container = document.createElement('div')
    document.body.appendChild(container)
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {})
  })

  afterEach(() => {
    if (root) {
      act(() => root.unmount())
      root = null
    }
    container.remove()
    jest.clearAllTimers()
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it.each([false, true])(
    'reuses server markup and enables client scrolling (navigation: %s)',
    (withNavigation) => {
      const addListener = jest.spyOn(window, 'addEventListener')
      const removeListener = jest.spyOn(window, 'removeEventListener')
      const onRecoverableError = jest.fn()
      const element = (
        <FullPage
          pageNav={withNavigation ? [{ title: 'Start' }, { title: 'End' }] : []}
          indicatorStyle={{ width: '8px' }}
          indicatorStyleActive={{ width: '20px' }}
        >
          <section>
            <h1>First page</h1>
          </section>
          <section>Second page</section>
        </FullPage>
      )

      container.innerHTML = renderToString(element)
      const markup = container.innerHTML
      const serverNodes = Array.from(container.querySelectorAll('*'))
      expect(container.textContent).toContain('First pageSecond page')
      expect(
        addListener.mock.calls.filter(([event]) => event === 'scroll')
      ).toHaveLength(0)
      expect(window.scrollTo).not.toHaveBeenCalled()

      act(() => {
        root = hydrateRoot(container, element, { onRecoverableError })
      })

      expect(onRecoverableError).not.toHaveBeenCalled()
      expect(console.error).not.toHaveBeenCalled()
      expect(container.innerHTML).toBe(markup)
      const clientNodes = Array.from(container.querySelectorAll('*'))
      expect(clientNodes).toHaveLength(serverNodes.length)
      serverNodes.forEach((node, index) => {
        expect(clientNodes[index]).toBe(node)
      })
      const scrollListeners = addListener.mock.calls.filter(
        ([event]) => event === 'scroll'
      )
      expect(scrollListeners).toHaveLength(1)
      expect(window.scrollTo).not.toHaveBeenCalled()

      jest
        .spyOn(document.body, 'getBoundingClientRect')
        .mockReturnValue({ top: -1 })
      act(() => {
        window.dispatchEvent(new window.Event('scroll'))
      })
      expect(window.scrollTo).toHaveBeenLastCalledWith(0, window.innerHeight)
      const indicators = container.firstChild.children[2].children
      expect(indicators[1].style.width).toBe('20px')

      act(() => {
        jest.advanceTimersByTime(1000)
        const target = withNavigation
          ? container.querySelector('.page-nav').firstChild
          : indicators[0]
        target.click()
      })
      expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0)
      expect(indicators[0].style.width).toBe('20px')

      act(() => {
        root.unmount()
        root = null
      })
      expect(removeListener).toHaveBeenCalledWith(
        'scroll',
        scrollListeners[0][1]
      )
      window.scrollTo.mockClear()
      window.dispatchEvent(new window.Event('scroll'))
      expect(window.scrollTo).not.toHaveBeenCalled()
      expect(jest.getTimerCount()).toBe(0)
    }
  )
})
