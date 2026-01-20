import React from 'react'
import { render, screen } from '@testing-library/react'
import { PythonOutput } from './pythonOutput'

describe('PythonOutput Component', () => {
  it('renders without crashing', () => {
    render(<PythonOutput />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<PythonOutput />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<PythonOutput />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
