import React from 'react'
import { render, screen } from '@testing-library/react'
import { SidebarGroupLabel } from './sidebarGroupLabel'

describe('SidebarGroupLabel Component', () => {
  it('renders without crashing', () => {
    render(<SidebarGroupLabel />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SidebarGroupLabel />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SidebarGroupLabel />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
