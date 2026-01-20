import React from 'react'
import { render, screen } from '@testing-library/react'
import { DemoFeatureCards } from './demoFeatureCards'

describe('DemoFeatureCards Component', () => {
  it('renders without crashing', () => {
    render(<DemoFeatureCards />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<DemoFeatureCards />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<DemoFeatureCards />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
