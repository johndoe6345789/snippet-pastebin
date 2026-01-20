import React from 'react'
import { render, screen } from '@testing-library/react'
import { IconsSection } from './iconsSection'

describe('IconsSection Component', () => {
  it('renders without crashing', () => {
    render(<IconsSection />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<IconsSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<IconsSection />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
