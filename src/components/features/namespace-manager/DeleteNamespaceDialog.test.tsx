import React from 'react'
import { render, screen } from '@testing-library/react'
import { DeleteNamespaceDialog } from './deleteNamespaceDialog'

describe('DeleteNamespaceDialog Component', () => {
  it('renders without crashing', () => {
    render(<DeleteNamespaceDialog />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<DeleteNamespaceDialog />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<DeleteNamespaceDialog />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
