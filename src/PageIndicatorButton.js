import React from 'react'
import PropTypes from 'prop-types'

const PageIndicatorButton = (props) => {
  const {
    goToPage,
    pageIndex,
    active,
    indicatorStyle,
    indicatorStyleActive
  } = props

  const [style, setStyle] = React.useState({})

  React.useMemo(() => {
    let result = indicatorStyle
    if (active) {
      result = { ...indicatorStyle, ...indicatorStyleActive }
    }
    setStyle(result)
  }, [indicatorStyle, indicatorStyleActive])

  return <div style={style} onClick={() => goToPage(pageIndex)} />
}

PageIndicatorButton.propTypes = {
  goToPage: PropTypes.func,
  pageIndex: PropTypes.number,
  active: PropTypes.bool,
  indicatorStyle: PropTypes.object,
  indicatorStyleActive: PropTypes.object
}
PageIndicatorButton.defaultProps = {
  pageIndex: 1,
  active: false,
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

export default PageIndicatorButton
