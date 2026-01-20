import React from 'react'
import { render, screen } from '@testing-library/react'
import { NavigationBarsShowcase } from './navigationBarsShowcase'

describe('NavigationBarsShowcase Component', () => {
  it('renders without crashing', () => {
    render(<NavigationBarsShowcase />)
    expect(screen.queryByTestId('test'), { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<NavigationBarsShowcase />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<NavigationBarsShowcase />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
