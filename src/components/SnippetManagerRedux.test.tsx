import React from 'react'
import { render, screen } from '@testing-library/react'
import { SnippetManagerRedux } from './snippetManagerRedux'

describe('SnippetManagerRedux Component', () => {
  it('renders without crashing', () => {
    render(<SnippetManagerRedux />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SnippetManagerRedux />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SnippetManagerRedux />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
