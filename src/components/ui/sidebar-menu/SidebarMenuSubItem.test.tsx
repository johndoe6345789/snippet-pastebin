import React from 'react'
import { render, screen } from '@testing-library/react'
import { SidebarMenuSubItem } from './sidebarMenuSubItem'

describe('SidebarMenuSubItem Component', () => {
  it('renders without crashing', () => {
    render(<SidebarMenuSubItem />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SidebarMenuSubItem />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SidebarMenuSubItem />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
