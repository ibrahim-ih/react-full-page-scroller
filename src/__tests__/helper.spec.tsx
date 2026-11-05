import React from 'react'
import { getValidChildren } from '../helper'

describe('getValidChildren', () => {
  it('returns only valid React elements', () => {
    const result = getValidChildren([
      <div key='valid'>Valid</div>,
      null,
      'text',
      false
    ])

    expect(result).toHaveLength(1)
    expect(result[0].type).toBe('div')
  })
})
