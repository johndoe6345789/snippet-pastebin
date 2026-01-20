import React from 'react'
import { render, screen } from '@/test-utils'
import { Badge } from './badge'

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders badge element', () => {
      render(<Badge>New</Badge>)
      expect(screen.getByText('New')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      render(<Badge>Label</Badge>)
      expect(screen.getByText('Label')).toBeInTheDocument()
    })

    it('renders with HTML content', () => {
      render(
        <Badge>
          <span data-testid="content">Custom</span>
        </Badge>
      )
      expect(screen.getByTestId('content')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('renders default variant', () => {
      const { container } = render(<Badge>Default</Badge>)
      const badge = container.firstChild
      expect(badge).toBeInTheDocument()
    })

    it('applies secondary variant', () => {
      const { container } = render(<Badge variant="secondary">Secondary</Badge>)
      const badge = container.firstChild as HTMLElement | null
      expect(badge?.className).toBeTruthy()
    })

    it('applies outline variant', () => {
      const { container } = render(<Badge variant="outline">Outline</Badge>)
      const badge = container.firstChild
      expect(badge).toBeInTheDocument()
    })

    it('applies destructive variant', () => {
      const { container } = render(<Badge variant="destructive">Error</Badge>)
      const badge = container.firstChild
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('accepts custom className', () => {
      const { container } = render(<Badge className="custom-badge">Badge</Badge>)
      const badge = container.firstChild as Element
      expect(badge).toHaveClass('custom-badge')
    })

    it('applies both variant and custom class', () => {
      const { container } = render(
        <Badge variant="secondary" className="my-class">
          Badge
        </Badge>
      )
      const badge = container.firstChild as Element
      expect(badge).toHaveClass('my-class')
    })
  })

  describe('Accessibility', () => {
    it('renders as semantic element', () => {
      const { container } = render(<Badge>Label</Badge>)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('supports data attributes', () => {
      render(<Badge data-testid="status-badge">Active</Badge>)
      expect(screen.getByTestId('status-badge')).toBeInTheDocument()
    })

    it('supports aria attributes', () => {
      render(<Badge aria-label="Status: Active">Active</Badge>)
      expect(screen.getByLabelText('Status: Active')).toBeInTheDocument()
    })
  })

  describe('Content Variations', () => {
    it('renders with numeric content', () => {
      render(<Badge>42</Badge>)
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('renders with emoji', () => {
      render(<Badge>🔥 Hot</Badge>)
      expect(screen.getByText('🔥 Hot')).toBeInTheDocument()
    })

    it('renders with long text', () => {
      const longText = 'This is a very long badge label that wraps'
      render(<Badge>{longText}</Badge>)
      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('renders with empty content', () => {
      const { container } = render(<Badge></Badge>)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('works with other elements', () => {
      render(
        <div>
          <span>Status:</span>
          <Badge variant="secondary">Pending</Badge>
        </div>
      )
      expect(screen.getByText('Status:')).toBeInTheDocument()
      expect(screen.getByText('Pending')).toBeInTheDocument()
    })

    it('renders multiple badges', () => {
      render(
        <div>
          <Badge>New</Badge>
          <Badge variant="secondary">Updated</Badge>
          <Badge variant="destructive">Critical</Badge>
        </div>
      )
      expect(screen.getByText('New')).toBeInTheDocument()
      expect(screen.getByText('Updated')).toBeInTheDocument()
      expect(screen.getByText('Critical')).toBeInTheDocument()
    })
  })
})
