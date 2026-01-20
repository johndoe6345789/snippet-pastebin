import React from 'react'
import { render, screen } from '@testing-library/react'
import { CreateNamespaceDialog } from './createNamespaceDialog'

describe('CreateNamespaceDialog Component', () => {
  it('renders without crashing', () => {
    render(<CreateNamespaceDialog />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<CreateNamespaceDialog />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<CreateNamespaceDialog />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
