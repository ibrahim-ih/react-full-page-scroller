import React from 'react'
import PageNav from './PageNav'
import Page from './Page'
import PageIndicator from './PageIndicator'
import { getValidChildren } from './helper'

export default class PageScroller extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollPos: 0,
      pageIndex: 0,
      scrollAgain: true,
      children: null
    }

    this.pages = 0
    this.scrollLocker = () => {}
  }

  componentDidMount = () => {
    const { children: childrenProp } = this.props
    debugger
    this.setState({ children: getValidChildren(childrenProp) })
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scrollPos = this.state.scrollPos
    const pageIndex = this.state.pageIndex
    const winHeight = window.innerHeight

    if (this.state.scrollAgain) {
      if (document.body.getBoundingClientRect().top > scrollPos) {
        // handle scroll up
        if (pageIndex - 1 >= 0) {
          // pageIndex--;
          this.scroll(winHeight, pageIndex - 1)
        }
      } else {
        // handle scroll down
        if (pageIndex + 1 <= this.pages - 1) {
          // pageIndex++;
          this.scroll(winHeight, pageIndex + 1)
        }
      }
    } else {
      // scroll to current position if scrolling is disabled
      window.scrollTo(0, pageIndex * winHeight)
    }
  }

  scroll = (winHeight, pageIndex) => {
    window.scrollTo(0, winHeight * pageIndex)

    this.scrollLocker = setTimeout(() => {
      this.setState({ scrollAgain: true })
    }, 1000)

    this.setState({
      scrollPos: document.body.getBoundingClientRect().top,
      pageIndex: pageIndex,
      scrollAgain: false
    })
  }

  goToPage = (index) => {
    this.scroll(window.innerHeight, index)
  }

  renderChildren = () => {
    const childElements = []
    let pageIndicator
    let pageNav
    const navButtons = []
    let pageCount = 0

    const { children } = this.state
    if (children && children.length > 0) {
      React.Children.map(children, (child, i) => {
        if (child.type === Page) {
          if (child.props.navTitle) {
            navButtons.push({
              title: child.props.navTitle,
              index: pageCount
            })
          }

          pageCount++
          childElements.push(child)
        } else if (child.type === PageIndicator) {
          pageIndicator = child
        } else if (child.type === PageNav) {
          pageNav = child
        }
      })
    }

    this.pages = pageCount

    if (pageIndicator) {
      childElements.push(
        React.cloneElement(pageIndicator, {
          pageCount: this.pages,
          activePage: this.state.pageIndex,
          goToPage: this.goToPage
        })
      )
    }

    if (pageNav) {
      childElements.push(
        React.cloneElement(pageNav, {
          goToPage: this.goToPage,
          navButtons: navButtons
        })
      )
    }

    return childElements
  }

  render() {
    return <div {...this.props}>{this.renderChildren()}</div>
  }
}
