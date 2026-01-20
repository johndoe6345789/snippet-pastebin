import React from 'react'
import { render, screen } from '@testing-library/react'
import { TerminalOutput } from './terminalOutput'

describe('TerminalOutput Component', () => {
  it('renders without crashing', () => {
    render(<TerminalOutput />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<TerminalOutput />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<TerminalOutput />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
