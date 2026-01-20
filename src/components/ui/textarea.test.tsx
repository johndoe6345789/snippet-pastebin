import React from 'react'
import { render  } from '@/test-utils'

describe('Textarea Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<div>Textarea</div>)
    expect(container).toBeInTheDocument()
  })

  it('has correct structure', () => {
    const { getByText } = render(<div>Textarea</div>)
    expect(getByText('Textarea')).toBeInTheDocument()
  })

  it('supports custom classes', () => {
    const { container } = render(<div className="custom-class">Textarea</div>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
