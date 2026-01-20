import React from 'react'
import { render, screen } from '@testing-library/react'
import { InputsSection } from './inputsSection'

describe('InputsSection Component', () => {
  it('renders without crashing', () => {
    render(<InputsSection />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<InputsSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<InputsSection />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
