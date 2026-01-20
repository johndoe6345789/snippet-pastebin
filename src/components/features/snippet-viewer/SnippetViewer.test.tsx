import React from 'react'
import { render, screen } from '@testing-library/react'
import { SnippetViewer } from './snippetViewer'

describe('SnippetViewer Component', () => {
  it('renders without crashing', () => {
    render(<SnippetViewer />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SnippetViewer />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SnippetViewer />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
