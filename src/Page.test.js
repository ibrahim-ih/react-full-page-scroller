import React from 'react'
import Page from './Page'
import { createRenderer } from './test-utils'

describe('Page', () => {
  let renderer

  beforeEach(() => {
    renderer = createRenderer()
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    renderer.unmount()
    jest.restoreAllMocks()
  })

  it('renders the child contents and class in a full viewport wrapper', () => {
    renderer.render(
      <Page>
        <section className='original'>
          <h1>First page</h1>
        </section>
      </Page>
    )

    const page = renderer.container.firstChild
    expect(page.tagName).toBe('DIV')
    expect(page.className).toBe('original')
    expect(page.style.height).toBe('100vh')
    expect(page.style.width).toBe('100vw')
    expect(page.querySelector('h1').textContent).toBe('First page')
    expect(page.querySelector('section')).toBeNull()
  })

  it('preserves child styles but prevents child dimensions overriding the viewport', () => {
    renderer.render(
      <Page>
        <div style={{ color: 'red', width: '20px', height: '30px' }}>
          Content
        </div>
      </Page>
    )

    const { style } = renderer.container.firstChild
    expect(style.color).toBe('red')
    expect(style.width).toBe('100vw')
    expect(style.height).toBe('100vh')
  })

  it('merges page styles over child styles while ignoring custom dimensions', () => {
    renderer.render(
      <Page style={{ color: 'blue', padding: '10px', height: 20, width: 30 }}>
        <div style={{ color: 'red', backgroundColor: 'black' }}>Content</div>
      </Page>
    )

    const { style } = renderer.container.firstChild
    expect(style.color).toBe('blue')
    expect(style.backgroundColor).toBe('black')
    expect(style.padding).toBe('10px')
    expect(style.width).toBe('100vw')
    expect(style.height).toBe('100vh')
  })

  it('renders an empty child element without adding content or a class', () => {
    renderer.render(
      <Page>
        <div />
      </Page>
    )

    expect(renderer.container.firstChild.textContent).toBe('')
    expect(renderer.container.firstChild.hasAttribute('class')).toBe(false)
  })
})
