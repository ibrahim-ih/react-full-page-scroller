import React from 'react'
import Page from './Page'
import PageIndicator from './PageIndicator'
import PageNav from './PageNav'
import PageScroller from './PageScroller'
import type { PageNavItem } from './types'

export type { PageNavItem } from './types'

export interface FullPageProps {
  children?: React.ReactNode
  pageNav?: PageNavItem[] | null
  indicatorStyle?: React.CSSProperties
  indicatorStyleActive?: React.CSSProperties
}

export const FullPage = ({
  children = null,
  pageNav: pageNavProp,
  indicatorStyle = {
    height: '100vh',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  indicatorStyleActive = { backgroundColor: '#fff' }
}: FullPageProps): React.ReactElement | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const pageNav = pageNavProp ?? []

  return (
    <PageScroller style={{ display: 'flex', flexDirection: 'column' }}>
      {pageNav.length > 0 && <PageNav />}
      <PageIndicator
        indicatorStyle={indicatorStyle}
        indicatorStyleActive={indicatorStyleActive}
      />
      {React.Children.toArray(children).map((child, id) => (
        <Page key={`react-full-page-${id}`} pageNav={pageNav}>
          {child}
        </Page>
      ))}
    </PageScroller>
  )
}

export default FullPage
