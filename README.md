# react-full-page-scroller

> A react module for full page scroll

[![NPM](https://img.shields.io/npm/v/react-full-page-scroller.svg)](https://www.npmjs.com/package/react-full-page-scroller) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-full-page-scroller
```

## Demo

![](https://raw.githubusercontent.com/ibrahim-ih/react-full-page-scroller/master/example/src/react-full-page-scroller.gif)

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-full-page-scroller'
import 'react-full-page-scroller/dist/index.css'

class Example extends Component {
  render() {
    return (
      <MyComponent>
        <div>
          <h1>1</h1>
        </div>
        <div>
          <h1>2</h1>
        </div>
        <div>
          <h1>3</h1>
        </div>
      </MyComponent>
    )
  }
}
```

### Props

| Prop Name            | Type   |
| -------------------- | ------ |
| pageNav              | Object |
| indicatorStyle       | object |
| indicatorStyleActive | object |

#### Page Nav Object

You can customize every button in the nav page

| Name      | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| id        | number | Yes      | id for the object.                      |
| title     | string | Yes      | title of the nav button.                |
| className | string | No       | the className of the page nav button.   |
| style     | object | No       | A custom style for the page nav button. |

##### Exemple

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-full-page-scroller'
import 'react-full-page-scroller/dist/index.css'

const PageNavExample  {

    const navExample={[{
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
                  ]};

    return (
      <MyComponent pageNav={navExample}>
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
```

#### Indicator Style

You can add an indicator by adding the two props indicatorStyle and indicatorStyleActive

| Name                 | Type   | Required | Description                                                    |
| -------------------- | ------ | -------- | -------------------------------------------------------------- |
| indicatorStyle       | object | Yes      | the indicator default style is required to show the indicator. |
| indicatorStyleActive | object | No       | the style of the active indicator.                             |

##### Exemple

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-full-page-scroller'
import 'react-full-page-scroller/dist/index.css'

const PageNavExample  {

 const  indicatorStyle = {
    height: '8px',
    width: '8px',
    margin: '10px',
    borderRadius: '4px',
    backgroundColor: 'white',
    transition: 'width 500ms ease'
  }
  const indicatorStyleActive= { width: '20px' }

    return (
      <MyComponent indicatorStyle={indicatorStyle} indicatorStyleActive={indicatorStyleActive}>
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
```

## License

© [Ibrahim Haouari](https://github.com/Ibrahim-ih)
