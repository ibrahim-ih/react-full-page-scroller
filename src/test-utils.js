import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

export const createRenderer = () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  return {
    container,
    render(element) {
      let instance
      act(() => {
        instance = ReactDOM.render(element, container)
      })
      return instance
    },
    unmount() {
      act(() => {
        ReactDOM.unmountComponentAtNode(container)
      })
      container.remove()
    }
  }
}
