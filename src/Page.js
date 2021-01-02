import React from 'react'

const Page = (props) => {
  const { style, children: parent } = { ...props }
  const { height, width, ...cleanedStyle } = { ...style }
  const pageStyle = {
    height: '100vh',
    width: '100vw',
    ...cleanedStyle
  }
  console.log(parent.type)
  console.log(parent)
  const {
    props: { children }
  } = parent

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
