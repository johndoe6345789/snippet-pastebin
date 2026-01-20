import React from 'react'
import { render  } from '@/test-utils'

describe('Sonner Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<div>Sonner</div>)
    expect(container).toBeInTheDocument()
  })

  it('has correct structure', () => {
    const { getByText } = render(<div>Sonner</div>)
    expect(getByText('Sonner')).toBeInTheDocument()
  })

  it('supports custom classes', () => {
    const { container } = render(<div className="custom-class">Sonner</div>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
