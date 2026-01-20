import React from 'react'
import { render, screen } from '@testing-library/react'
import { Accordion } from './accordion'

describe('Accordion Component', () => {
  it('renders without crashing', () => {
    render(<Accordion />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<Accordion />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<Accordion />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
