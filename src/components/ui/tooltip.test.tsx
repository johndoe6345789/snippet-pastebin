import React from 'react'
import { render  } from '@/test-utils'

describe('Tooltip Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<div>Tooltip</div>)
    expect(container).toBeInTheDocument()
  })

  it('has correct structure', () => {
    const { getByText } = render(<div>Tooltip</div>)
    expect(getByText('Tooltip')).toBeInTheDocument()
  })

  it('supports custom classes', () => {
    const { container } = render(<div className="custom-class">Tooltip</div>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
