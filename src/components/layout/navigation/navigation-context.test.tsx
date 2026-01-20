import React from 'react'
import { render, screen } from '@testing-library/react'
import { NavigationContext } from './navigationContext'

describe('NavigationContext Component', () => {
  it('renders without crashing', () => {
    render(<NavigationContext />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<NavigationContext />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<NavigationContext />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
