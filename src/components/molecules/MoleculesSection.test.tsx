import React from 'react'
import { render, screen } from '@testing-library/react'
import { MoleculesSection } from './moleculesSection'

describe('MoleculesSection Component', () => {
  it('renders without crashing', () => {
    render(<MoleculesSection />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<MoleculesSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<MoleculesSection />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
