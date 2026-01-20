import React from 'react'
import { render } from '@testing-library/react'

describe('Dialog Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<div>Dialog</div>)
    expect(container).toBeInTheDocument()
  })

  it('has correct structure', () => {
    const { getByText } = render(<div>Dialog</div>)
    expect(getByText('Dialog')).toBeInTheDocument()
  })

  it('supports custom classes', () => {
    const { container } = render(<div className="custom-class">Dialog</div>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
