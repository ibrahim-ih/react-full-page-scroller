import React from 'react'
import type { PageNavItem } from './types'

export interface PageProps {
  children?: React.ReactNode
  pageNav?: PageNavItem[] | null
  style?: React.CSSProperties
}

interface PageContentProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const Page = ({ children, style }: PageProps): React.ReactElement => {
  const { height, width, ...cleanedStyle } = style || {}
  const content = React.isValidElement<PageContentProps>(children)
    ? children
    : null
  const pageStyle: React.CSSProperties = {
    height: '100vh',
    width: '100vw',
    ...cleanedStyle
  }

  return (
    <div
      className={content?.props.className}
      style={{ ...content?.props.style, ...pageStyle }}
    >
      {content ? content.props.children : children}
    </div>
  )
}

export default Page
