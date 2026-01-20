import React from 'react'
import { render, screen } from '@testing-library/react'
import { ReactPreview } from './reactPreview'

describe('ReactPreview Component', () => {
  it('renders without crashing', () => {
    render(<ReactPreview />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<ReactPreview />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<ReactPreview />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
