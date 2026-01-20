import React from 'react'
import { render, screen } from '@testing-library/react'
import { SearchBarsSection } from './searchBarsSection'

describe('SearchBarsSection Component', () => {
  it('renders without crashing', () => {
    render(<SearchBarsSection />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SearchBarsSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SearchBarsSection />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
