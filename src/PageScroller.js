import React from 'react'
import PropTypes from 'prop-types'
import PageNav from './PageNav'
import Page from './Page'
import PageIndicator from './PageIndicator'
import { getValidChildren } from './helper'

export default class PageScroller extends React.Component {
  // proptypes
  static propTypes = {
    children: PropTypes.node,
    navButtons: PropTypes.arrayOf(
      PropTypes.shape({
        index: PropTypes.number,
        title: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object
      }),
    ),
    goToPage: PropTypes.func,
    pageIndex: PropTypes.number,
    indicatorStyle: PropTypes.object,
    indicatorStyleActive: PropTypes.object
  }
  // defaultProps
  static defaultProps = {
    children: null,
    navButtons: [],
    goToPage: () => {},
    pageIndex: 0,
    indicatorStyle: {
      height: '100vh',
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    indicatorStyleActive: {
      backgroundColor: '#fff'
    },
  }

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
    const indicatorArray = []
    let pageCount = 0

    const { children } = this.state
    if (children && children.length > 0) {
      React.Children.map(children, (child, i) => {
        if (child.type === Page) {
          if (child.props.pageNav && child.props.pageNav.length > 0) {
            const { title, className, style } = child.props.pageNav[pageCount]
            if (title) {
              navButtons.push({
                index: pageCount,
                title: title,
                className: className || null,
                style: style || {}
              })
            }
          }

          pageCount++
          childElements.push(child)
        } else if (child.type === PageIndicator) {
          if (child.props.indicatorStyle || child.props.indicatorStyleActive) {
            const { indicatorStyle, indicatorStyleActive } = child.props
            indicatorArray.push({
              indicatorStyle: indicatorStyle,
              indicatorStyleActive: indicatorStyleActive
            })
          }
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
          goToPage: this.goToPage,
          indicatorArray: indicatorArray
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
