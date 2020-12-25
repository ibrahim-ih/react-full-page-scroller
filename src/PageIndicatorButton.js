import React from 'react'
import PropTypes from 'prop-types'

const PageIndicatorButton = (props) => {
  const { goToPage, pageIndex, active } = props

  const indicatorStyle = {
    height: '8px',
    width: active ? '20px' : '8px',
    margin: '10px',
    borderRadius: '4px',
    backgroundColor: 'white',
    transition: 'width 500ms ease'
  }

  return <div style={indicatorStyle} onClick={() => goToPage(pageIndex)} />
}

PageIndicatorButton.propTypes = {
  goToPage: PropTypes.func,
  pageIndex: PropTypes.number,
  active: PropTypes.bool
}
PageIndicatorButton.defaultProps = {
  goToPage: () => {},
  pageIndex: 1,
  active: false
}

export default PageIndicatorButton
