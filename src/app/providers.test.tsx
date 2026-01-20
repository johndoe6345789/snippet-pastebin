import React from 'react'
import { render, screen } from '@testing-library/react'
import Providers from './providers'

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

describe('Providers Page', () => {
  it('renders page without crashing', () => {
    const { container } = render(<Providers />)
    expect(container).toBeInTheDocument()
  })

  it('contains main content area', () => {
    const { container } = render(<Providers />)
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })
})
