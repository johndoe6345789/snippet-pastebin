import React from 'react';
import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { ErrorFallback } from './ErrorFallback';

// Mock AIErrorHelper to avoid its complexity
jest.mock('@/components/error/AIErrorHelper', () => ({
  AIErrorHelper: () => <div data-testid="ai-error-helper">AI Error Helper</div>,
}));

// Mock window.location.reload
delete (window as any).location;
window.location = { reload: jest.fn() } as any;

describe('ErrorFallback', () => {
  const testError = new Error('Test error message');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render error fallback container', () => {
      render(<ErrorFallback error={testError} />);
      expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
    });

    it('should display error message', () => {
      const error = new Error('Custom error message');
      render(<ErrorFallback error={error} />);
      expect(screen.getByText('Custom error message')).toBeInTheDocument();
    });

    it('should display alert with error title', () => {
      render(<ErrorFallback error={testError} />);
      expect(screen.getByTestId('error-alert')).toBeInTheDocument();
      expect(screen.getByText('This spark has encountered a runtime error')).toBeInTheDocument();
    });

    it('should render AIErrorHelper component', () => {
      render(<ErrorFallback error={testError} />);
      expect(screen.getByTestId('ai-error-helper')).toBeInTheDocument();
    });

    it('should render reload button', () => {
      render(<ErrorFallback error={testError} />);
      expect(screen.getByRole('button', { name: /try reloading/i })).toBeInTheDocument();
    });

    it('should render copy button', () => {
      render(<ErrorFallback error={testError} />);
      expect(screen.getByTestId('copy-error-btn')).toBeInTheDocument();
    });

    it('should render stack trace toggle', () => {
      render(<ErrorFallback error={testError} />);
      expect(screen.getByText(/show stack trace/i)).toBeInTheDocument();
    });
  });

  describe('error display', () => {
    it('should show error message in code block', () => {
      const error = new Error('Specific error');
      render(<ErrorFallback error={error} />);
      expect(screen.getByTestId('error-message')).toHaveTextContent('Specific error');
    });

    it('should handle error without stack trace', () => {
      const error = new Error('No stack');
      error.stack = undefined;
      render(<ErrorFallback error={error} />);

      const message = screen.getByTestId('error-message');
      expect(message).toBeInTheDocument();
    });
  });

  describe('button functionality', () => {
    it('should have copy button with test id', () => {
      render(<ErrorFallback error={testError} />);
      const copyButton = screen.getByTestId('copy-error-btn');
      expect(copyButton).toBeInTheDocument();
    });

    it('should call window.location.reload on reload button click', async () => {
      const user = userEvent.setup();
      render(<ErrorFallback error={testError} />);

      const reloadButton = screen.getByRole('button', { name: /try reloading/i });
      await user.click(reloadButton);

      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  describe('stack trace toggle', () => {
    it('should start with stack trace hidden', () => {
      render(<ErrorFallback error={testError} />);
      expect(screen.getByText(/show stack trace/i)).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have aria-label on copy button', () => {
      render(<ErrorFallback error={testError} />);
      const copyButton = screen.getByTestId('copy-error-btn');
      expect(copyButton).toHaveAttribute('aria-label', 'Copy error details');
    });

    it('should have alert title for screen readers', () => {
      render(<ErrorFallback error={testError} />);
      expect(screen.getByText('This spark has encountered a runtime error')).toBeInTheDocument();
    });

    it('should hide decorative icons from screen readers', () => {
      const { container } = render(<ErrorFallback error={testError} />);
      const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenIcons.length).toBeGreaterThan(0);
    });

    it('should use semantic alert structure', () => {
      render(<ErrorFallback error={testError} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('layout', () => {
    it('should use min-h-screen for full height', () => {
      render(<ErrorFallback error={testError} />);
      const fallbackDiv = screen.getByTestId('error-fallback');
      expect(fallbackDiv).toHaveClass('min-h-screen');
    });

    it('should center content', () => {
      render(<ErrorFallback error={testError} />);
      const fallbackDiv = screen.getByTestId('error-fallback');
      expect(fallbackDiv).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });
});
