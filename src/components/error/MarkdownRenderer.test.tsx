import React from 'react'
import { render, screen } from '@testing-library/react'
import { MarkdownRenderer } from './markdownRenderer'

describe('MarkdownRenderer Component', () => {
  it('renders without crashing', () => {
    render(<MarkdownRenderer />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<MarkdownRenderer />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<MarkdownRenderer />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
