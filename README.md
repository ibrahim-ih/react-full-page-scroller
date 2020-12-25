# react-full-page-scroller

> A react module for full page scroll

[![NPM](https://img.shields.io/npm/v/react-full-page-scroller.svg)](https://www.npmjs.com/package/react-full-page-scroller) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-full-page-scroller
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-full-page-scroller'
import 'react-full-page-scroller/dist/index.css'

class Example extends Component {
  render() {
    return (
      <MyComponent indicator nav>
        <h1 className='page-number'>1</h1>

        <h1 className='page-number'>2</h1>

        <h1 className='page-number'>3</h1>
      </MyComponent>
    )
  }
}
```

## License

© [Ibrahim Haouari](https://github.com/Ibrahim-ih)
