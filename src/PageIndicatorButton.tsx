import React from 'react'

export interface PageIndicatorButtonProps {
  goToPage?: (index: number) => void
  pageIndex?: number
  active?: boolean
  indicatorStyle?: React.CSSProperties
  indicatorStyleActive?: React.CSSProperties
}

const defaultIndicatorStyle: React.CSSProperties = {
  height: '8px',
  width: '8px',
  margin: '10px',
  borderRadius: '4px',
  backgroundColor: 'white',
  transition: 'width 500ms ease'
}

const PageIndicatorButton = ({
  goToPage = () => {},
  pageIndex = 1,
  active = false,
  indicatorStyle = defaultIndicatorStyle,
  indicatorStyleActive = { width: '20px' }
}: PageIndicatorButtonProps): React.ReactElement => {
  const style = active
    ? { ...indicatorStyle, ...indicatorStyleActive }
    : indicatorStyle

  return <div style={style} onClick={() => goToPage(pageIndex)} />
}

export default PageIndicatorButton
