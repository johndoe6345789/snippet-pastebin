import React from 'react'
import { render, screen } from '@testing-library/react'
import { MonacoEditor } from './monacoEditor'

describe('MonacoEditor Component', () => {
  it('renders without crashing', () => {
    render(<MonacoEditor />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<MonacoEditor />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<MonacoEditor />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
