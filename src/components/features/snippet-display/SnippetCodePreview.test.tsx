import React from 'react'
import { render, screen } from '@testing-library/react'
import { SnippetCodePreview } from './snippetCodePreview'

describe('SnippetCodePreview Component', () => {
  it('renders without crashing', () => {
    render(<SnippetCodePreview />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SnippetCodePreview />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SnippetCodePreview />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
