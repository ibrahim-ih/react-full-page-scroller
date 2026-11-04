import React from 'react'
import Page from './Page'
import PageIndicator, { PageIndicatorProps } from './PageIndicator'
import PageNav, { PageNavProps } from './PageNav'
import { getValidChildren } from './helper'
import type { PageProps } from './Page'

type PageScrollerProps = React.HTMLAttributes<HTMLDivElement>

interface PageScrollerState {
  scrollPos: number
  pageIndex: number
  scrollAgain: boolean
  children: React.ReactElement[]
}

export default class PageScroller extends React.Component<
  PageScrollerProps,
  PageScrollerState
> {
  private pages = 0
  private scrollLocker: ReturnType<typeof setTimeout> | null = null

  state: PageScrollerState = {
    scrollPos: 0,
    pageIndex: 0,
    scrollAgain: true,
    children: []
  }

  componentDidMount(): void {
    this.setState({ children: getValidChildren(this.props.children) })
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.scrollLocker !== null) {
      clearTimeout(this.scrollLocker)
    }
  }

  private handleScroll = (): void => {
    const { scrollPos, pageIndex, scrollAgain } = this.state
    const winHeight = window.innerHeight

    if (scrollAgain) {
      if (document.body.getBoundingClientRect().top > scrollPos) {
        if (pageIndex > 0) {
          this.scroll(winHeight, pageIndex - 1)
        }
      } else if (pageIndex < this.pages - 1) {
        this.scroll(winHeight, pageIndex + 1)
      }
    } else {
      window.scrollTo(0, pageIndex * winHeight)
    }
  }

  private scroll = (winHeight: number, pageIndex: number): void => {
    window.scrollTo(0, winHeight * pageIndex)
    if (this.scrollLocker !== null) {
      clearTimeout(this.scrollLocker)
    }

    this.scrollLocker = setTimeout(() => {
      this.setState({ scrollAgain: true })
      this.scrollLocker = null
    }, 1000)

    this.setState({
      scrollPos: document.body.getBoundingClientRect().top,
      pageIndex,
      scrollAgain: false
    })
  }

  private goToPage = (index: number): void => {
    this.scroll(window.innerHeight, index)
  }

  private renderChildren = (): React.ReactNode[] => {
    const childElements: React.ReactNode[] = []
    const navButtons: NonNullable<PageNavProps['navButtons']> = []
    let pageIndicator: React.ReactElement<PageIndicatorProps> | undefined
    let pageNav: React.ReactElement<PageNavProps> | undefined
    let pageCount = 0

    this.state.children.forEach((child) => {
      if (child.type === Page) {
        const page = child as React.ReactElement<PageProps>
        const navItem = page.props.pageNav?.[pageCount]
        if (navItem?.title) {
          navButtons.push({
            index: pageCount,
            title: navItem.title,
            className: navItem.className || null,
            style: navItem.style || {}
          })
        }

        pageCount++
        childElements.push(child)
      } else if (child.type === PageIndicator) {
        pageIndicator = child as React.ReactElement<PageIndicatorProps>
      } else if (child.type === PageNav) {
        pageNav = child as React.ReactElement<PageNavProps>
      }
    })

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
          navButtons
        })
      )
    }

    return childElements
  }

  render(): React.ReactElement {
    return <div {...this.props}>{this.renderChildren()}</div>
  }
}
