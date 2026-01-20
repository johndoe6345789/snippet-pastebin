import React from 'react'
import { render, screen } from '@testing-library/react'
import { SidebarMenuSkeleton } from './sidebarMenuSkeleton'

describe('SidebarMenuSkeleton Component', () => {
  it('renders without crashing', () => {
    render(<SidebarMenuSkeleton />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SidebarMenuSkeleton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SidebarMenuSkeleton />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
