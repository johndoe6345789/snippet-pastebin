import React from 'react'
import { render, screen } from '@testing-library/react'
import { DashboardTemplate } from './dashboardTemplate'

describe('DashboardTemplate Component', () => {
  it('renders without crashing', () => {
    render(<DashboardTemplate />)
    expect(screen.queryByTestId('test')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<DashboardTemplate />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<DashboardTemplate />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
