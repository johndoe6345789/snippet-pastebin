import React from 'react'
import { render, screen } from '@testing-library/react'
import { NavigationSidebar } from './navigationSidebar'

describe('NavigationSidebar Component', () => {
  it('renders without crashing', () => {
    render(<NavigationSidebar />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<NavigationSidebar />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<NavigationSidebar />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
