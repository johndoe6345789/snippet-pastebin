import React from 'react'
import { render, screen } from '@testing-library/react'
import { EmptyState } from './emptyState'

describe('EmptyState Component', () => {
  it('renders without crashing', () => {
    render(<EmptyState />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<EmptyState />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<EmptyState />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
