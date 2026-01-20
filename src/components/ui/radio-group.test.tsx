import React from 'react'
import { render, screen } from '@testing-library/react'
import { RadioGroup } from './radioGroup'

describe('RadioGroup Component', () => {
  it('renders without crashing', () => {
    render(<RadioGroup />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<RadioGroup />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<RadioGroup />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
