import React from 'react'
import PageIndicatorButton from './PageIndicatorButton'

export interface IndicatorStyle {
  indicatorStyle?: React.CSSProperties
  indicatorStyleActive?: React.CSSProperties
}

export interface PageIndicatorProps extends IndicatorStyle {
  pageCount?: number
  activePage?: number
  goToPage?: (index: number) => void
  style?: React.CSSProperties
}

const defaultIndicatorStyle: React.CSSProperties = {
  height: '8px',
  width: '8px',
  margin: '10px',
  borderRadius: '4px',
  backgroundColor: 'white',
  transition: 'width 500ms ease'
}

const PageIndicator = ({
  pageCount = 1,
  activePage = 0,
  goToPage = () => {},
  style = {},
  indicatorStyle = defaultIndicatorStyle,
  indicatorStyleActive = { width: '20px' }
}: PageIndicatorProps): React.ReactElement => {
  const pageIndicatorStyle: React.CSSProperties = {
    ...style,
    height: '100vh',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }

  return (
    <div style={pageIndicatorStyle}>
      {Array.from({ length: pageCount }, (_, index) => {
        const active = index === activePage
        return (
          <PageIndicatorButton
            active={active}
            pageIndex={index}
            goToPage={goToPage}
            key={index}
            indicatorStyle={indicatorStyle}
            indicatorStyleActive={indicatorStyleActive}
          />
        )
      })}
    </div>
  )
}

export default PageIndicator
