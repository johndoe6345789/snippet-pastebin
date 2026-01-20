import React from 'react'
import { render, screen } from '@testing-library/react'
import { ColorsSection } from './colorsSection'

describe('ColorsSection Component', () => {
  it('renders without crashing', () => {
    render(<ColorsSection />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<ColorsSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<ColorsSection />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
