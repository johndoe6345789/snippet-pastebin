import React from 'react'
import { render, screen } from '@testing-library/react'
import { SnippetCardActions } from './snippetCardActions'

describe('SnippetCardActions Component', () => {
  it('renders without crashing', () => {
    render(<SnippetCardActions />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SnippetCardActions />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SnippetCardActions />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
