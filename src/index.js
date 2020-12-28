import React from 'react'
import PageNav from './PageNav'
import PageScroller from './PageScroller'
import PageIndicator from './PageIndicator'
import Page from './Page'
import PropTypes from 'prop-types'

export const FullPage = (props) => {
  const { indicator, pageNav, pageClasses, children } = props
  return (
    <PageScroller style={{ display: 'flex', flexDirection: 'column' }}>
      {pageNav && pageNav.length > 0 && <PageNav />}
      {indicator && <PageIndicator />}
      {React.Children.toArray(children).map((child, id) => {
        return (
          <Page
            key={`react-full-page-${id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            pageNav={pageNav}
            pageClasses={(pageClasses[id] || {}).className}
          >
            {child}
          </Page>
        )
      })}
    </PageScroller>
  )
}

FullPage.propTypes = {
  children: PropTypes.node.isRequired,
  indicator: PropTypes.bool,
  pageNav: PropTypes.array
}

FullPage.defaultProps = {
  indicator: false,
  pageNav: null
}

export default FullPage
