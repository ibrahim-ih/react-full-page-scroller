import React from 'react'
import PropTypes from 'prop-types'

const PageNav = (props) => {
  const { goToPage, navButtons } = props
  const renderButtons = () => {
    const buttons = []
    navButtons.map((buttonInfo, i) => {
      buttons.push(
        <div
          className={`${buttonInfo.className || 'page-nav-button'}`}
          onClick={() => goToPage(buttonInfo.index)}
          style={buttonInfo.style}
          key={i}
        >
          {buttonInfo.title}
        </div>
      )
    })

    return buttons
  }
  return <div className='page-nav'>{renderButtons()}</div>
}

PageNav.propTypes = {
  navButtons: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      title: PropTypes.string,
      className: PropTypes.string,
      style: PropTypes.object
    })
  ),
  goToPage: PropTypes.func
}

PageNav.defaultProps = {
  navButtons: [],
  goToPage: () => {}
}

export default PageNav
