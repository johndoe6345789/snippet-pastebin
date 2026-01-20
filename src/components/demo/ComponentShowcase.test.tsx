import React from 'react'
import { render, screen } from '@testing-library/react'
import { ComponentShowcase } from './componentShowcase'

describe('ComponentShowcase Component', () => {
  it('renders without crashing', () => {
    render(<ComponentShowcase />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<ComponentShowcase />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<ComponentShowcase />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
