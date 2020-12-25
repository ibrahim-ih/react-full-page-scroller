import React from 'react'
import PageNav from './PageNav'
import PageScroller from './PageScroller'
import PageIndicator from './PageIndicator'
import Page from './Page'
import PropTypes from 'prop-types'

export const FullPage = (props) => {
  const { indicator, nav, children } = props
  return (
    <PageScroller style={{ display: 'flex', flexDirection: 'column' }}>
      {nav && <PageNav />}
      {indicator && <PageIndicator />}

      {React.Children.toArray(children).map((child, id) => {
        return (
          <Page
            key={`react-full-page-${id}`}
            style={{
              backgroundColor: 'blue',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            navTitle='Num 1'
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
  nav: PropTypes.bool
}

FullPage.defaultProps = {
  indicator: false,
  nav: false
}

export default FullPage
