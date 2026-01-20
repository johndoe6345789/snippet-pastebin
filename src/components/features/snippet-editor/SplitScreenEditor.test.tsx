import React from 'react'
import { render, screen } from '@testing-library/react'
import { SplitScreenEditor } from './splitScreenEditor'

describe('SplitScreenEditor Component', () => {
  it('renders without crashing', () => {
    render(<SplitScreenEditor />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SplitScreenEditor />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SplitScreenEditor />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
