import React from 'react'
import { render } from '@testing-library/react'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

describe('AtomsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(<div>AtomsPage</div>)
    expect(container).toBeInTheDocument()
  })

  it('component is defined', () => {
    expect(AtomsPage).toBeDefined()
  })
})
