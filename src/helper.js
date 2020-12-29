import React from 'react'

export const getValidChildren = (children) => {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  )
}
