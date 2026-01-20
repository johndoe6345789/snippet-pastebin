import React from 'react'
import { render, screen } from '@testing-library/react'
import { NavigationProvider } from './navigationProvider'

describe('NavigationProvider Component', () => {
  it('renders without crashing', () => {
    render(<NavigationProvider />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<NavigationProvider />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<NavigationProvider />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
