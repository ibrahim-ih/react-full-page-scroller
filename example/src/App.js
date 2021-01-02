import React from 'react'

import MyComponent from 'react-full-page-scroller'
import 'react-full-page-scroller/dist/index.css'

const App = () => {
  const nav = [
    {
      id: 1,
      title: 'title 1',
      className: 'page-nav-button',
      style: { width: '1rem' }
    },
    {
      id: 2,
      title: 'title 2',
      className: 'page-nav-button',
      style: { width: '1rem' }
    },
    {
      id: 3,
      title: 'title 3',
      className: 'page-nav-button',
      style: { width: '1rem' }
    }
  ]
  const indicatorStyle = {
    height: '8px',
    width: '8px',
    margin: '10px',
    borderRadius: '4px',
    backgroundColor: 'white',
    transition: 'width 500ms ease'
  }
  const indicatorStyleActive = { width: '20px' }

  return (
    <MyComponent
      pageNav={nav}
      indicatorStyle={indicatorStyle}
      indicatorStyleActive={indicatorStyleActive}
    >
      <div
        className='bg-blue'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1 className='page-number'>1</h1>
      </div>
      <div
        className='bg-green'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1 className='page-number'>2</h1>
      </div>
      <div
        className='bg-red'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1 className='page-number'>3</h1>
      </div>
    </MyComponent>
  )
}

export default App
