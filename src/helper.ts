import React from 'react'

export const getValidChildren = (
  children: React.ReactNode
): React.ReactElement[] =>
  React.Children.toArray(children).filter(
    (child): child is React.ReactElement => React.isValidElement(child)
  )
