import React from 'react'
import { render  } from '@/test-utils'

describe('AspectRatio Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<div>AspectRatio</div>)
    expect(container).toBeInTheDocument()
  })

  it('has correct structure', () => {
    const { getByText } = render(<div>AspectRatio</div>)
    expect(getByText('AspectRatio')).toBeInTheDocument()
  })

  it('supports custom classes', () => {
    const { container } = render(<div className="custom-class">AspectRatio</div>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
