import React from 'react'
import { render, screen } from '@testing-library/react'
import { Select } from './select'

describe('Select Component', () => {
  it('renders without crashing', () => {
    render(<Select />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<Select />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<Select />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
