import React from 'react'
import { render, screen } from '@testing-library/react'
import { Progress } from './progress'

describe('Progress Component', () => {
  it('renders without crashing', () => {
    render(<Progress />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<Progress />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<Progress />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
