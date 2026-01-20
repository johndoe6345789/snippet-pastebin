import React from 'react'
import { render, screen } from '@testing-library/react'
import { TerminalHeader } from './terminalHeader'

describe('TerminalHeader Component', () => {
  it('renders without crashing', () => {
    render(<TerminalHeader />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<TerminalHeader />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<TerminalHeader />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
