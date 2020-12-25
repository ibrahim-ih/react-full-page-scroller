import React from 'react'
import PageIndicatorButton from './PageIndicatorButton'
import PropTypes from 'prop-types'

const PageIndicator = (props) => {
  const { pageCount, activePage, goToPage, style } = props
  const renderIndicators = () => {
    const count = pageCount
    const indicators = []

    for (let i = 0; i < count; i++) {
      indicators.push(
        <PageIndicatorButton
          active={i === activePage}
          pageIndex={i}
          goToPage={goToPage}
          key={i}
        />
      )
    }

    return indicators
  }

  const pageIndicatorStyle = {
    ...style,
    height: '100vh',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }

  return <div style={pageIndicatorStyle}>{renderIndicators()}</div>
}

PageIndicatorButton.propTypes = {
  goToPage: PropTypes.func,
  pageCount: PropTypes.number,
  activePage: PropTypes.number,
  style: PropTypes.object
}

PageIndicatorButton.defaultProps = {
  goToPage: () => {},
  pageCount: 1,
  activePage: 1,
  style: {}
}

export default PageIndicator
