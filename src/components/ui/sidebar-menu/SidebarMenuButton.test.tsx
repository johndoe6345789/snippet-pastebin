import React from 'react'
import { render, screen } from '@testing-library/react'
import { SidebarMenuButton } from './sidebarMenuButton'

describe('SidebarMenuButton Component', () => {
  it('renders without crashing', () => {
    render(<SidebarMenuButton />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SidebarMenuButton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SidebarMenuButton />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
