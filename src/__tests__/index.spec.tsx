import React from 'react'
import { render } from '@testing-library/react'
import FullPage from '../index'

describe('FullPage', () => {
  it('renders the scroller and page content', async () => {
    const { findByText } = render(
      <FullPage>
        <div>Full page content</div>
      </FullPage>
    )

    expect(await findByText('Full page content')).toBeInTheDocument()
  })
})
