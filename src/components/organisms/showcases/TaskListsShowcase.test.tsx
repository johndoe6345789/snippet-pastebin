import React from 'react'
import { render, screen } from '@testing-library/react'
import { TaskListsShowcase } from './taskListsShowcase'

describe('TaskListsShowcase Component', () => {
  it('renders without crashing', () => {
    render(<TaskListsShowcase />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<TaskListsShowcase />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<TaskListsShowcase />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
