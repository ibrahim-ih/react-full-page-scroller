import React from 'react'

const Page = (props) => {
  const { style, children: parent } = { ...props }
  const { height, width, ...cleanedStyle } = { ...style }
  debugger

  const pageStyle = {
    height: '100vh',
    width: '100vw',
    ...cleanedStyle
  }
  const { props: { children = [] } = {} } = parent || {}
  return (
    <div
      className={((parent || {}).props || {}).className}
      style={{ ...((parent || {}).props || {}).style, ...pageStyle }}
    >
      {children}
    </div>
  )
}
export default Page
