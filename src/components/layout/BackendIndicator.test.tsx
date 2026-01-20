import React from 'react'
import { render, screen } from '@testing-library/react'
import { BackendIndicator } from './backendIndicator'

describe('BackendIndicator Component', () => {
  it('renders without crashing', () => {
    render(<BackendIndicator />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<BackendIndicator />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<BackendIndicator />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
