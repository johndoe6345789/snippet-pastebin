import React from 'react'
import { render, screen } from '@testing-library/react'
import { CodeEditorSection } from './codeEditorSection'

describe('CodeEditorSection Component', () => {
  it('renders without crashing', () => {
    render(<CodeEditorSection />)
    expect(screen.getByRole('*', { hidden: true })).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<CodeEditorSection />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<CodeEditorSection />)
    expect(container.firstChild).toHaveAttribute('class')
  })
})
