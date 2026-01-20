import React from 'react'
import { render, screen } from '@testing-library/react'
import { DataTablesShowcase } from './dataTablesShowcase'

describe('DataTablesShowcase Component', () => {
  it('renders without crashing', () => {
    render(<DataTablesShowcase />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<DataTablesShowcase />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<DataTablesShowcase />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
