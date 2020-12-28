import React from 'react'

const Page = (props) => {
  const { style, children, ...otherProps } = { ...props }
  const { height, width, ...cleanedStyle } = { ...style }
  const pageStyle = {
    height: '100vh',
    width: '100vw',
    ...cleanedStyle
  }

  return (
    <div style={pageStyle} {...otherProps}>
      {children}
    </div>
  )
}
export default Page
