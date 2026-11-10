const assert = require('assert')
const { execFileSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')

const root = path.resolve(__dirname, '../..')
const archive = path.resolve(process.argv[2] || '')
const pkg = require(path.join(root, 'package.json'))
const lock = require(path.join(root, 'package-lock.json'))
const [reactVersion, reactDomVersion, reactTypesVersion, reactDomTypesVersion] =
  process.argv.slice(3)

if (!process.argv[2] || !fs.existsSync(archive)) {
  throw new Error('Pass the packed package archive as the first argument')
}

const entries = execFileSync('tar', ['-tzf', archive], { encoding: 'utf8' })
  .trim()
  .split(/\r?\n/)
const entrySet = new Set(entries)

for (const field of ['main', 'module', 'types']) {
  assert(
    entrySet.has(`package/${pkg[field]}`),
    `Archive is missing ${field}: ${pkg[field]}`
  )
}

assert(
  entries.every(
    (entry) =>
      !entry.endsWith('.d.ts') || entry.startsWith('package/dist/types/')
  ),
  'Archive contains duplicate declaration output outside dist/types'
)
assert(
  !entries.some((entry) =>
    /(?:__tests__|setupTests|\.test|\.spec)\.?.*\.d\.ts$/.test(entry)
  ),
  'Archive contains test or setup declarations'
)

const consumer = fs.mkdtempSync(
  path.join(os.tmpdir(), 'react-full-page-scroller-consumer-')
)

try {
  fs.writeFileSync(
    path.join(consumer, 'package.json'),
    JSON.stringify({ private: true })
  )

  const packageVersion = (name) => lock.packages[`node_modules/${name}`].version
  execFileSync(
    'npm',
    [
      'install',
      '--prefix',
      consumer,
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      archive,
      `react@${reactVersion || packageVersion('react')}`,
      `react-dom@${reactDomVersion || packageVersion('react-dom')}`,
      `@types/react@${reactTypesVersion || packageVersion('@types/react')}`,
      `@types/react-dom@${reactDomTypesVersion || packageVersion('@types/react-dom')}`,
      `jsdom@${packageVersion('jsdom')}`,
      `typescript@${packageVersion('typescript')}`
    ],
    { cwd: root, stdio: 'inherit' }
  )

  const cjsConsumer = path.join(consumer, 'consumer.cjs')
  fs.writeFileSync(
    cjsConsumer,
    `
    const assert = require('assert')
    const React = require('react')
    const library = require('react-full-page-scroller')
    const { renderToString } = require('react-dom/server')
    const app = React.createElement(
      library.default,
      null,
      React.createElement('div', null, 'Hydrated consumer')
    )
    assert.strictEqual(library.default, library.FullPage)
    assert(React.isValidElement(React.createElement(library.default)))
    assert.strictEqual(
      renderToString(app),
      '<div style="display:flex;flex-direction:column"></div>'
    )

    const { JSDOM } = require('jsdom')
    const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost' })
    globalThis.window = dom.window
    globalThis.document = dom.window.document
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: dom.window.navigator
    })
    globalThis.IS_REACT_ACT_ENVIRONMENT = true

    const { hydrateRoot } = require('react-dom/client')
    const container = document.getElementById('root')
    container.innerHTML = renderToString(app)
    const errors = []
    let root

    ;(async () => {
      await React.act(async () => {
        root = hydrateRoot(
          container,
          app,
          { onRecoverableError: (error) => errors.push(error) }
        )
      })
      assert.strictEqual(container.textContent, 'Hydrated consumer')
      assert.deepStrictEqual(errors, [])
      await React.act(async () => {
        root.unmount()
      })
      dom.window.close()
    })().catch((error) => {
      console.error(error)
      process.exitCode = 1
    })
  `
  )
  execFileSync(process.execPath, [cjsConsumer], {
    cwd: consumer,
    stdio: 'inherit'
  })

  const esmBundle = path.join(consumer, 'index.modern.mjs')
  fs.copyFileSync(
    path.join(consumer, 'node_modules', pkg.name, pkg.module),
    esmBundle
  )
  const esmConsumer = path.join(consumer, 'consumer.mjs')
  fs.writeFileSync(
    esmConsumer,
    `
    import assert from 'assert'
    import React from 'react'
    import FullPage, { FullPage as NamedFullPage } from './index.modern.mjs'
    assert.strictEqual(FullPage, NamedFullPage)
    assert(React.isValidElement(React.createElement(FullPage)))
  `
  )
  execFileSync(process.execPath, [esmConsumer], {
    cwd: consumer,
    stdio: 'inherit'
  })

  const typesConsumer = path.join(consumer, 'consumer.tsx')
  fs.writeFileSync(
    typesConsumer,
    `
    import React from 'react'
    import FullPage, { FullPage as NamedFullPage } from 'react-full-page-scroller'
    import type { FullPageProps, PageNavItem } from 'react-full-page-scroller'

    const pageNav: PageNavItem[] = [{ title: 'Page one' }]
    const props: FullPageProps = { pageNav }
    const defaultExport: React.ReactElement | null = FullPage(props)
    const namedExport: React.ReactElement | null = NamedFullPage(props)
    void defaultExport
    void namedExport
  `
  )
  execFileSync(
    path.join(consumer, 'node_modules', '.bin', 'tsc'),
    [
      '--strict',
      '--noEmit',
      '--target',
      'ES2017',
      '--jsx',
      'react',
      '--esModuleInterop',
      '--skipLibCheck',
      '--moduleResolution',
      'bundler',
      '--module',
      'esnext',
      typesConsumer
    ],
    { cwd: consumer, stdio: 'inherit' }
  )

  console.log('Verified isolated CommonJS, ESM, and TypeScript consumers')
} finally {
  fs.rmSync(consumer, { recursive: true, force: true })
}
