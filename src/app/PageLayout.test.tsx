import React from 'react'
import { render, screen } from '@testing-library/react'
import PageLayout from './pageLayout'

// Mock Next.js router and other dependencies as needed
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

describe('PageLayout Page', () => {
  it('renders page without crashing', () => {
    const { container } = render(<PageLayout />)
    expect(container).toBeInTheDocument()
  })

  it('contains main content area', () => {
    const { container } = render(<PageLayout />)
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })
})
