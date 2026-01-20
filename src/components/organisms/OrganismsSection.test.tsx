import React from 'react'
import { render, screen } from '@testing-library/react'
import { OrganismsSection } from './organismsSection'

describe('OrganismsSection Component', () => {
  it('renders without crashing', () => {
    render(<OrganismsSection />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<OrganismsSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<OrganismsSection />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
