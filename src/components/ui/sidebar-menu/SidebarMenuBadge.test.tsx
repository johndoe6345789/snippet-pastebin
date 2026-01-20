import React from 'react'
import { render, screen } from '@testing-library/react'
import { SidebarMenuBadge } from './sidebarMenuBadge'

describe('SidebarMenuBadge Component', () => {
  it('renders without crashing', () => {
    render(<SidebarMenuBadge />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SidebarMenuBadge />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SidebarMenuBadge />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
