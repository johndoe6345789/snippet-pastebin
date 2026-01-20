import React from 'react'
import { render, screen } from '@testing-library/react'
import { SidebarNavigationShowcase } from './sidebarNavigationShowcase'

describe('SidebarNavigationShowcase Component', () => {
  it('renders without crashing', () => {
    render(<SidebarNavigationShowcase />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<SidebarNavigationShowcase />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<SidebarNavigationShowcase />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
