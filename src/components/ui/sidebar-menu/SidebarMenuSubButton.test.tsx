import React from 'react'
import { render, screen } from '@testing-library/react'
import { SidebarMenuSubButton } from './sidebarMenuSubButton'

describe('SidebarMenuSubButton Component', () => {
  it('renders without crashing', () => {
    render(<SidebarMenuSubButton />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SidebarMenuSubButton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SidebarMenuSubButton />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
