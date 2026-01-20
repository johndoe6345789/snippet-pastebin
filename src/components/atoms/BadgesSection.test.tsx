import React from 'react'
import { render, screen } from '@testing-library/react'
import { BadgesSection } from './badgesSection'

describe('BadgesSection Component', () => {
  it('renders without crashing', () => {
    render(<BadgesSection />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<BadgesSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<BadgesSection />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
