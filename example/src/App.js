import React from 'react'

import MyComponent from 'react-full-page-scroller'
import logo from './1200px-React-icon.svg.png'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const App = () => {
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
  const indicatorStyle = {
    height: '8px',
    width: '8px',
    margin: '10px',
    borderRadius: '4px',
    backgroundColor: 'white',
    transition: 'width 500ms ease'
  }
  const indicatorStyleActive = { width: '20px' }

  const codeString ="import React, { Component } from 'react'\n" +
    "\n" +
    "import MyComponent from 'react-full-page-scroller'\n" +
    "import 'react-full-page-scroller/dist/index.css'\n" +
    "\n" +
    "class Example extends Component {\n" +
    "  render() {\n" +
    "    return (\n" +
    "      <MyComponent>\n" +
    "        <div>\n" +
    "          <h1>1</h1>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "          <h1>2</h1>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "          <h1>3</h1>\n" +
    "        </div>\n" +
    "      </MyComponent>\n" +
    "    )\n" +
    "  }\n" +
    "}"

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
        <img src={logo} alt="Logo" height="50%" />
        <h1 className='page-number'>React Full Page Scroller</h1>
        <button style={{height:'30px', cursor: 'pointer'}} onClick={() => window.location.href="https://github.com/ibrahim-ih/react-full-page-scroller"}>View on Github</button>
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
        <div style={{width: "50%", margin: "0 auto"}}>
          <SyntaxHighlighter language="javascript" style={dark}>
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
