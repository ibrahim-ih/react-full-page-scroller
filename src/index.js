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

// define propTypes
FullPage.propTypes = {
  pageNav: PropTypes.array,
  indicatorStyle: PropTypes.object,
  indicatorStyleActive: PropTypes.object,
  children: PropTypes.node,
}

// defaultProps
FullPage.defaultProps = {
  pageNav: [],
  indicatorStyle: {
    height: '100vh',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  indicatorStyleActive: {
    backgroundColor: '#fff',
  },
  children: null,
}


export default FullPage
