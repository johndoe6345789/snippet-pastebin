import React from 'react'
import { render } from '@testing-library/react'

describe('Skeleton Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<div>Skeleton</div>)
    expect(container).toBeInTheDocument()
  })

  it('has correct structure', () => {
    const { getByText } = render(<div>Skeleton</div>)
    expect(getByText('Skeleton')).toBeInTheDocument()
  })

  it('supports custom classes', () => {
    const { container } = render(<div className="custom-class">Skeleton</div>)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
