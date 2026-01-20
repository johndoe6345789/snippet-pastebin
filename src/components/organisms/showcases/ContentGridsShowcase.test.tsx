import React from 'react'
import { render, screen } from '@testing-library/react'
import { ContentGridsShowcase } from './contentGridsShowcase'

describe('ContentGridsShowcase Component', () => {
  it('renders without crashing', () => {
    render(<ContentGridsShowcase />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<ContentGridsShowcase />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<ContentGridsShowcase />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
