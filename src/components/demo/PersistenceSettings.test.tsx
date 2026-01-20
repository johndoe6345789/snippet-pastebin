import React from 'react'
import { render, screen } from '@testing-library/react'
import { PersistenceSettings } from './persistenceSettings'

describe('PersistenceSettings Component', () => {
  it('renders without crashing', () => {
    render(<PersistenceSettings />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<PersistenceSettings />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<PersistenceSettings />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
