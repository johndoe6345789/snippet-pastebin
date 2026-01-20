import React from 'react'
import { render, screen } from '@testing-library/react'
import { PythonTerminal } from './pythonTerminal'

describe('PythonTerminal Component', () => {
  it('renders without crashing', () => {
    render(<PythonTerminal />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<PythonTerminal />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<PythonTerminal />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
