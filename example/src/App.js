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
  const pageClasses = [
    {
      id: 0,
      className: 'bg-blue'
    },
    {
      id: 1,
      className: 'bg-red'
    }
  ]
  return (
    <MyComponent indicator pageClasses={pageClasses} pageNav={nav}>
      <div>
        <h1 className='page-number'>1</h1>
      </div>
      <div>
        <h1 className='page-number'>2</h1>
      </div>
      <div>
        <h1 className='page-number'>3</h1>
      </div>
    </MyComponent>
  )
}

export default App
