import React from 'react'
import PageIndicatorButton from './PageIndicatorButton'
import PropTypes from 'prop-types'

const PageIndicator = (props) => {
  const {
    pageCount,
    activePage,
    goToPage,
    style,
    indicatorStyle,
    indicatorStyleActive
  } = props
  const renderIndicators = () => {
    const count = pageCount
    const indicators = []
    for (let i = 0; i < count; i++) {
      const active = i === activePage
      indicators.push(
        <PageIndicatorButton
          active={active}
          pageIndex={i}
          goToPage={goToPage}
          key={i}
          indicatorStyle={indicatorStyle}
          indicatorStyleActive={active && indicatorStyleActive}
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

// propTypes
PageIndicator.propTypes = {
  pageCount: PropTypes.number,
  activePage: PropTypes.number,
  goToPage: PropTypes.func,
  style: PropTypes.object,
  indicatorStyle: PropTypes.object,
  indicatorStyleActive: PropTypes.object
}
PageIndicator.defaultProps = {
  pageCount: 1,
  activePage: 0,
  goToPage: () => {},
  style: {},
  indicatorStyle: {
    height: '8px',
    width: '8px',
    margin: '10px',
    borderRadius: '4px',
    backgroundColor: 'white',
    transition: 'width 500ms ease'
  },
  indicatorStyleActive: { width: '20px' }
}

export default PageIndicator
