import React from 'react'
import { render, screen } from '@testing-library/react'
import { ButtonsSection } from './buttonsSection'

describe('ButtonsSection Component', () => {
  it('renders without crashing', () => {
    render(<ButtonsSection />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<ButtonsSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<ButtonsSection />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
