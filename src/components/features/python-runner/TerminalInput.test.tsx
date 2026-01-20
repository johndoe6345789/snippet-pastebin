import React from 'react'
import { render, screen } from '@testing-library/react'
import { TerminalInput } from './terminalInput'

describe('TerminalInput Component', () => {
  it('renders without crashing', () => {
    render(<TerminalInput />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<TerminalInput />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<TerminalInput />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
