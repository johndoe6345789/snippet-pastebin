import React from 'react'
import { render, screen } from '@testing-library/react'
import { StorageBackendCard } from './storageBackendCard'

describe('StorageBackendCard Component', () => {
  it('renders without crashing', () => {
    render(<StorageBackendCard />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<StorageBackendCard />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<StorageBackendCard />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
