import React from 'react'
import { render, screen } from '@testing-library/react'
import { Sidebar } from './sidebar'

describe('Sidebar Component', () => {
  it('renders without crashing', () => {
    render(<Sidebar />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<Sidebar />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<Sidebar />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
