import React from 'react'
import { FullPage as MyComponent } from 'react-full-page-scroller'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import logo from './1200px-React-icon.svg.png'

const App = (): React.ReactElement => {
  const nav = [
    {
      id: 1,
      title: 'Title 1',
      className: 'page-nav-button',
      style: { width: '100%' }
    },
    {
      id: 2,
      title: 'Title 2',
      className: 'page-nav-button',
      style: { width: '100%' }
    },
    {
      id: 3,
      title: 'Title 3',
      className: 'page-nav-button',
      style: { width: '100%' }
    }
  ]
  const indicatorStyle: React.CSSProperties = {
    height: '8px',
    width: '8px',
    margin: '10px',
    borderRadius: '4px',
    backgroundColor: 'white',
    transition: 'width 500ms ease'
  }
  const indicatorStyleActive: React.CSSProperties = { width: '20px' }
  const codeString = `import React from 'react'

import MyComponent from 'react-full-page-scroller'

const Example = () => (
  <MyComponent>
    <div><h1>1</h1></div>
    <div><h1>2</h1></div>
    <div><h1>3</h1></div>
  </MyComponent>
)`

  return (
    <MyComponent
      pageNav={nav}
      indicatorStyle={indicatorStyle}
      indicatorStyleActive={indicatorStyleActive}
    >
      <div
        className='bg-blue'
        style={{
          display: 'block',
          textAlign: 'center',
          margin: 'auto'
        }}
      >
        <img src={logo} alt='Logo' height='50%' />
        <h1 className='page-number'>React Full Page Scroller</h1>
        <button
          style={{ height: '30px', cursor: 'pointer' }}
          onClick={() =>
            (window.location.href =
              'https://github.com/ibrahim-ih/react-full-page-scroller')
          }
        >
          View on Github
        </button>
      </div>
      <div
        className='bg-green'
        style={{
          display: 'block',
          textAlign: 'center',
          margin: 'auto'
        }}
      >
        <h1 className='page-number'>USAGE</h1>
        <div style={{ width: '50%', margin: '0 auto' }}>
          <SyntaxHighlighter language='javascript' style={dark}>
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
      <div
        className='bg-red'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1 className='page-number'>Section 3</h1>
      </div>
    </MyComponent>
  )
}

export default App
