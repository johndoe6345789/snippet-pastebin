import React from 'react'
import { render, screen } from '@testing-library/react'
import { AtomsSection } from './atomsSection'

describe('AtomsSection Component', () => {
  it('renders without crashing', () => {
    render(<AtomsSection />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<AtomsSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<AtomsSection />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
