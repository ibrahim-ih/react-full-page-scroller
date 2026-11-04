# react-full-page-scroller

> A react module for full page scroll

[![NPM](https://img.shields.io/npm/v/react-full-page-scroller.svg)](https://www.npmjs.com/package/react-full-page-scroller) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-full-page-scroller
```

## Demo

![](https://raw.githubusercontent.com/ibrahim-ih/react-full-page-scroller/develop/example/src/react-full-page-scroller.gif)

## Usage

```jsx
import React, { Component } from 'react'

import FullPage from 'react-full-page-scroller'
import 'react-full-page-scroller/dist/index.css'

class Example extends Component {
  render() {
    return (
      <FullPage>
        <div>
          <h1>1</h1>
        </div>
        <div>
          <h1>2</h1>
        </div>
        <div>
          <h1>3</h1>
        </div>
      </FullPage>
    )
  }
}
```

### Props

`FullPage` accepts these props:

| Prop | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `children` | `ReactNode` | Yes | Page elements, one child element per page. |
| `pageNav` | `Array<{ title: string, className?: string, style?: CSSProperties }>` | No | Optional navigation configuration, in the same order as the page children. An entry with a `title` displays a button; `className` defaults to `page-nav-button` and `style` defaults to an empty object. |
| `indicatorStyle` | `CSSProperties` | No | Inline style for page indicators. Supplying this prop displays the indicators. |
| `indicatorStyleActive` | `CSSProperties` | No | Inline style merged into the active indicator. Defaults to `{ width: '20px' }`. |

For example:

```jsx
const pageNav = [
  { title: 'Introduction' },
  { title: 'Details', style: { color: 'blue' } },
]

const indicatorStyle = {
  height: '8px',
  width: '8px',
  margin: '10px',
  borderRadius: '4px',
  backgroundColor: 'white',
}

<FullPage
  pageNav={pageNav}
  indicatorStyle={indicatorStyle}
  indicatorStyleActive={{ width: '20px' }}
>
  <section><h1>Introduction</h1></section>
  <section><h1>Details</h1></section>
</FullPage>
```

### React support

The peer dependency supports React `>=16.8.0 <20` (React 16.8 through 19). React 16.8 is the minimum because the indicator component uses Hooks.

### Server-side rendering

`FullPage` returns `null` when `window` is unavailable, so it renders no markup on the server. It is client-rendered only and should not be used where server-rendered markup or hydration is required.

### Publishing

`package.json` sets `publishConfig.registry` to `https://npm.pkg.github.com/ibrahim-ih`, so `npm publish` targets GitHub Packages rather than the public npm registry. This setting controls publishing only; it does not change where `npm install` looks for packages. To publish to npmjs.com, explicitly use `npm publish --registry=https://registry.npmjs.org`.

## License

© [Ibrahim Haouari](https://github.com/Ibrahim-ih)
