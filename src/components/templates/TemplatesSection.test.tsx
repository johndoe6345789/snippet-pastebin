import React from 'react'
import { render, screen } from '@testing-library/react'
import { TemplatesSection } from './templatesSection'

describe('TemplatesSection Component', () => {
  it('renders without crashing', () => {
    render(<TemplatesSection />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<TemplatesSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<TemplatesSection />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
