import React from 'react'
import { render, screen } from '@testing-library/react'
import Page from '../Page'
import PageIndicator from '../PageIndicator'
import PageNav from '../PageNav'
import PageScroller from '../PageScroller'

describe('PageScroller', () => {
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
})
