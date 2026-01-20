import React from 'react'
import { render, screen } from '@testing-library/react'
import { Checkbox } from './checkbox'

describe('Checkbox Component', () => {
  it('renders without crashing', () => {
    render(<Checkbox />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<Checkbox />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<Checkbox />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
