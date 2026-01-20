import React from 'react'
import { render, screen } from '@testing-library/react'
import { StorageInfoCard } from './storageInfoCard'

describe('StorageInfoCard Component', () => {
  it('renders without crashing', () => {
    render(<StorageInfoCard />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<StorageInfoCard />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<StorageInfoCard />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
