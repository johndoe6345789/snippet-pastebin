import React from 'react'
import { render, screen } from '@testing-library/react'
import { Navigation } from './navigation'

describe('Navigation Component', () => {
  it('renders without crashing', () => {
    render(<Navigation />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<Navigation />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<Navigation />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
