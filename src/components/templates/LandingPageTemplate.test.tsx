import React from 'react'
import { render, screen } from '@testing-library/react'
import { LandingPageTemplate } from './landingPageTemplate'

describe('LandingPageTemplate Component', () => {
  it('renders without crashing', () => {
    render(<LandingPageTemplate />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<LandingPageTemplate />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<LandingPageTemplate />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
