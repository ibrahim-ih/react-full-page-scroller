import React from 'react'
import PageNav from './PageNav'
import PageScroller from './PageScroller'
import PageIndicator from './PageIndicator'
import Page from './Page'
import PropTypes from 'prop-types'

export const FullPage = (props) => {
  const { pageNav, indicatorStyle, indicatorStyleActive, children } = props
  if (typeof window !== 'undefined') {
    return (
      <PageScroller style={{ display: 'flex', flexDirection: 'column' }}>
        {pageNav && pageNav.length > 0 && <PageNav />}
        {indicatorStyle && (
          <PageIndicator
            indicatorStyle={indicatorStyle}
            indicatorStyleActive={indicatorStyleActive}
          />
        )}
        {React.Children.toArray(children).map((child, id) => {
          return (
            <Page key={`react-full-page-${id}`} pageNav={pageNav}>
              {child}
            </Page>
          )
        })}
      </PageScroller>
    )
  } else {
    return null
  }
}

FullPage.propTypes = {
  children: PropTypes.node.isRequired,
  indicatorStyle: PropTypes.object,
  pageNav: PropTypes.array
}

FullPage.defaultProps = {
  indicator: null,
  pageNav: null
}

export default FullPage
