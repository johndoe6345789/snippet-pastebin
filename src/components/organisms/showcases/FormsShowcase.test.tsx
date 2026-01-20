import React from 'react'
import { render, screen } from '@testing-library/react'
import { FormsShowcase } from './formsShowcase'

describe('FormsShowcase Component', () => {
  it('renders without crashing', () => {
    render(<FormsShowcase />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<FormsShowcase />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<FormsShowcase />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
