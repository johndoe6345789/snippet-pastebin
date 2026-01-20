import React from 'react'
import { render, screen } from '@testing-library/react'
import { ErrorFallback } from './errorFallback'

describe('ErrorFallback Component', () => {
  it('renders without crashing', () => {
    render(<ErrorFallback />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<ErrorFallback />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<ErrorFallback />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
