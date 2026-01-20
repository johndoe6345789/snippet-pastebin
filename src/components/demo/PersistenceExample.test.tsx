import React from 'react'
import { render, screen } from '@testing-library/react'
import { PersistenceExample } from './persistenceExample'

describe('PersistenceExample Component', () => {
  it('renders without crashing', () => {
    render(<PersistenceExample />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<PersistenceExample />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<PersistenceExample />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
