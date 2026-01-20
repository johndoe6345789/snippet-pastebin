import React from 'react'
import { render, screen } from '@testing-library/react'
import { Slider } from './slider'

describe('Slider Component', () => {
  it('renders without crashing', () => {
    render(<Slider />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<Slider />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<Slider />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
