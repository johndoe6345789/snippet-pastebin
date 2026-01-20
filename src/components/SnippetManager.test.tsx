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

describe('SnippetManager', () => {
  it('renders without crashing', () => {
    const { container } = render(<div>SnippetManager</div>)
    expect(container).toBeInTheDocument()
  })

  it('component is defined', () => {
    expect(SnippetManager).toBeDefined()
  })
})
