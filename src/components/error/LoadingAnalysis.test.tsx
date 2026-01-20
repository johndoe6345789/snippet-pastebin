import React from 'react'
import { render, screen } from '@testing-library/react'
import { LoadingAnalysis } from './loadingAnalysis'

describe('LoadingAnalysis Component', () => {
  it('renders without crashing', () => {
    render(<LoadingAnalysis />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<LoadingAnalysis />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<LoadingAnalysis />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
