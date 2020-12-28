import React from 'react'

const Page = (props) => {
  const { style, children, pageClasses } = { ...props }
  const { height, width, ...cleanedStyle } = { ...style }
  const pageStyle = {
    height: '100vh',
    width: '100vw',
    ...cleanedStyle
  }

  return (
    <div className={pageClasses} style={pageStyle}>
      {children}
    </div>
  )
}
export default Page
