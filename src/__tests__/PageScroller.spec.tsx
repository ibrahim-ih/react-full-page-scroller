import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Page from '../Page'
import PageIndicator from '../PageIndicator'
import PageNav from '../PageNav'
import PageScroller from '../PageScroller'

describe('PageScroller', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders pages, navigation, and indicators', async () => {
    const { container, findByText } = render(
      <PageScroller>
        <Page pageNav={[{ title: 'First page' }]}>
          <div>Page content</div>
        </Page>
        <PageNav />
        <PageIndicator />
      </PageScroller>
    )

    expect(await findByText('Page content')).toBeVisible()
    expect(screen.getByText('First page')).toBeVisible()
    expect(container.querySelector('.page-nav')).toBeInTheDocument()
    expect(container.firstElementChild?.children).toHaveLength(3)
  })

  it('updates children and clamps the active page when pages are removed', () => {
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {})

    const renderPages = (count: number) => {
      const pageNav = Array.from({ length: count }, (_, index) => ({
        title: `Navigation ${index + 1}`
      }))

      return (
        <PageScroller>
          <PageNav />
          <PageIndicator />
          {pageNav.map((_, index) => (
            <Page key={index} pageNav={pageNav}>
              <div>Page {index + 1}</div>
            </Page>
          ))}
        </PageScroller>
      )
    }

    const { container, rerender } = render(renderPages(2))
    rerender(renderPages(3))

    expect(screen.getByText('Page 3')).toBeVisible()
    expect(container.querySelector('.page-nav')?.children).toHaveLength(3)

    fireEvent.click(screen.getByText('Navigation 3'))
    rerender(renderPages(1))

    const scroller = container.firstElementChild
    expect(screen.queryByText('Page 2')).not.toBeInTheDocument()
    expect(scroller?.children).toHaveLength(3)
    expect(container.querySelector('.page-nav')?.children).toHaveLength(1)
    expect(scroller?.children[1].firstElementChild).toHaveStyle({
      width: '20px'
    })
  })
})
