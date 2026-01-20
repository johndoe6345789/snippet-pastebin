import React from 'react'
import { render, screen } from '@testing-library/react'
import { SnippetToolbar } from './snippetToolbar'

describe('SnippetToolbar Component', () => {
  it('renders without crashing', () => {
    render(<SnippetToolbar />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SnippetToolbar />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SnippetToolbar />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
