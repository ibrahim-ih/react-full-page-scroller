import React from 'react'

export interface NavButton {
  index: number
  title: string
  className?: string | null
  style?: React.CSSProperties
}

export interface PageNavProps {
  goToPage?: (index: number) => void
  navButtons?: NavButton[]
}

const PageNav = ({
  goToPage = () => {},
  navButtons = []
}: PageNavProps): React.ReactElement => (
  <div className='page-nav'>
    {navButtons.map((buttonInfo) => (
      <div
        className={buttonInfo.className || 'page-nav-button'}
        onClick={() => goToPage(buttonInfo.index)}
        style={buttonInfo.style}
        key={buttonInfo.index}
      >
        {buttonInfo.title}
      </div>
    ))}
  </div>
)

export default PageNav
