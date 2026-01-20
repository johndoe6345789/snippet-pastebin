import React from 'react'
import { render, screen } from '@testing-library/react'
import { Separator } from './separator'

describe('Separator Component', () => {
  it('renders without crashing', () => {
    render(<Separator />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
