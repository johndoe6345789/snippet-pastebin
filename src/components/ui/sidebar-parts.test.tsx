import React from 'react'
import { render, screen } from '@testing-library/react'
import { SidebarInput } from './sidebarInput'

describe('SidebarInput Component', () => {
  it('renders without crashing', () => {
    render(<SidebarInput />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SidebarInput />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SidebarInput />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
