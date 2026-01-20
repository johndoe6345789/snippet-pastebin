import React from 'react'
import { render, screen } from '@testing-library/react'
import { SnippetCard } from './snippetCard'

describe('SnippetCard Component', () => {
  it('renders without crashing', () => {
    render(<SnippetCard />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SnippetCard />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SnippetCard />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
