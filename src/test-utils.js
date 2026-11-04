import React from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'

export const createRenderer = () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)

  return {
    container,
    render(element) {
      let instance
      const isClassComponent =
        element &&
        element.type.prototype &&
        element.type.prototype.isReactComponent
      const ref = isClassComponent ? React.createRef() : null
      act(() => {
        root.render(ref ? React.cloneElement(element, { ref }) : element)
      })
      if (ref) instance = ref.current
      return instance
    },
    unmount() {
      act(() => {
        root.unmount()
      })
      container.remove()
    }
  }
}
