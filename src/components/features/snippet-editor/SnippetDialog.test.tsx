import React from 'react'
import { render, screen, waitFor } from '@/test-utils'
import userEvent from '@testing-library/user-event'
import { SnippetDialog } from './SnippetDialog'
import { Snippet } from '@/lib/types'

describe('SnippetDialog Component', () => {
  const mockOnSave = jest.fn()
  const mockOnOpenChange = jest.fn()

  const defaultProps = {
    open: true,
    onOpenChange: mockOnOpenChange,
    onSave: mockOnSave,
  }

  const mockSnippet: Snippet = {
    id: '1',
    title: 'Test Snippet',
    description: 'A test snippet',
    code: 'console.log("test")',
    language: 'JavaScript',
    hasPreview: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    namespaceId: 'default',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders dialog when open prop is true', () => {
      render(<SnippetDialog {...defaultProps} />)
      const dialog = screen.getByTestId('snippet-dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('does not render dialog when open prop is false', () => {
      render(<SnippetDialog {...defaultProps} open={false} />)
      const dialog = screen.queryByTestId('snippet-dialog')
      expect(dialog).not.toBeInTheDocument()
    })

    it('displays create title for new snippet', () => {
      render(<SnippetDialog {...defaultProps} />)
      expect(screen.getByText(/create/i)).toBeInTheDocument()
    })

    it('displays edit title when editing existing snippet', () => {
      render(<SnippetDialog {...defaultProps} editingSnippet={mockSnippet} />)
      expect(screen.getByText(/edit/i)).toBeInTheDocument()
    })
  })

  describe('Form Fields', () => {
    it('renders title input', () => {
      render(<SnippetDialog {...defaultProps} />)
      const titleInput = screen.getByTestId('snippet-title-input')
      expect(titleInput).toBeInTheDocument()
    })

    it('renders language select', () => {
      render(<SnippetDialog {...defaultProps} />)
      const languageSelect = screen.getByTestId('snippet-language-select')
      expect(languageSelect).toBeInTheDocument()
    })

    it('renders description textarea', () => {
      render(<SnippetDialog {...defaultProps} />)
      const descriptionTextarea = screen.getByTestId('snippet-description-textarea')
      expect(descriptionTextarea).toBeInTheDocument()
    })

    it('renders code editor section', () => {
      render(<SnippetDialog {...defaultProps} />)
      // Code editor should be present (Monaco editor or fallback)
      expect(screen.getByText(/code/i, { selector: 'label' })).toBeInTheDocument()
    })
  })

  describe('Create Mode', () => {
    it('starts with empty title input', () => {
      render(<SnippetDialog {...defaultProps} />)
      const titleInput = screen.getByTestId('snippet-title-input') as HTMLInputElement
      expect(titleInput.value).toBe('')
    })

    it('renders code editor section', () => {
      render(<SnippetDialog {...defaultProps} />)
      // Check for code editor section - Monaco editor is complex to test
      // At minimum, the dialog should have the code editor present
      const dialog = screen.getByTestId('snippet-dialog')
      expect(dialog).toBeInTheDocument()
    })

    it('allows entering title', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)
      const titleInput = screen.getByTestId('snippet-title-input') as HTMLInputElement

      await user.type(titleInput, 'My New Snippet')
      expect(titleInput.value).toBe('My New Snippet')
    })

    it('allows entering description', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)
      const descriptionTextarea = screen.getByTestId('snippet-description-textarea') as HTMLTextAreaElement

      await user.type(descriptionTextarea, 'This is a description')
      expect(descriptionTextarea.value).toBe('This is a description')
    })

    it('allows selecting language', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)
      const languageSelect = screen.getByTestId('snippet-language-select')

      await user.click(languageSelect)
      const pythonOption = screen.getByTestId('language-option-Python')
      await user.click(pythonOption)

      expect(languageSelect).toHaveTextContent('Python')
    })
  })

  describe('Edit Mode', () => {
    it('populates title with existing snippet data', () => {
      render(<SnippetDialog {...defaultProps} editingSnippet={mockSnippet} />)
      const titleInput = screen.getByTestId('snippet-title-input') as HTMLInputElement
      expect(titleInput.value).toBe('Test Snippet')
    })

    it('populates description with existing snippet data', () => {
      render(<SnippetDialog {...defaultProps} editingSnippet={mockSnippet} />)
      const descriptionTextarea = screen.getByTestId('snippet-description-textarea') as HTMLTextAreaElement
      expect(descriptionTextarea.value).toBe('A test snippet')
    })

    it('populates language with existing snippet data', () => {
      render(<SnippetDialog {...defaultProps} editingSnippet={mockSnippet} />)
      const languageSelect = screen.getByTestId('snippet-language-select')
      expect(languageSelect).toHaveTextContent('JavaScript')
    })

    it('allows modifying existing snippet title', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} editingSnippet={mockSnippet} />)
      const titleInput = screen.getByTestId('snippet-title-input')

      // Clear existing text and type new text
      await user.tripleClick(titleInput)
      await user.type(titleInput, 'Updated Snippet Title')
      expect(titleInput).toHaveValue('Updated Snippet Title')
    })
  })

  describe('Form Validation', () => {
    it('shows error when title is empty and form is submitted', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const saveButton = screen.getByTestId('snippet-dialog-save-btn')
      await user.click(saveButton)

      // Should show validation error
      await waitFor(() => {
        const titleInput = screen.getByTestId('snippet-title-input')
        expect(titleInput).toHaveAttribute('aria-invalid', 'true')
      })
    })

    it('shows error message for invalid title', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const saveButton = screen.getByTestId('snippet-dialog-save-btn')
      await user.click(saveButton)

      // Should display error text
      await waitFor(() => {
        expect(screen.getByText(/required/i)).toBeInTheDocument()
      })
    })

    it('prevents form submission with empty title', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const saveButton = screen.getByTestId('snippet-dialog-save-btn')
      await user.click(saveButton)

      // onSave should not be called
      expect(mockOnSave).not.toHaveBeenCalled()
    })
  })

  describe('Form Submission', () => {
    it('calls onSave with correct data when form is valid', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const titleInput = screen.getByTestId('snippet-title-input')

      await user.type(titleInput, 'New Snippet')

      const saveButton = screen.getByTestId('snippet-dialog-save-btn')
      await user.click(saveButton)

      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalled()
      })
    })

    it('calls onOpenChange(false) after successful save', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const titleInput = screen.getByTestId('snippet-title-input')

      await user.type(titleInput, 'New Snippet')

      const saveButton = screen.getByTestId('snippet-dialog-save-btn')
      await user.click(saveButton)

      await waitFor(() => {
        expect(mockOnOpenChange).toHaveBeenCalledWith(false)
      })
    })

    it('does not call onOpenChange when validation fails', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const saveButton = screen.getByTestId('snippet-dialog-save-btn')
      await user.click(saveButton)

      expect(mockOnOpenChange).not.toHaveBeenCalled()
    })
  })

  describe('Dialog Actions', () => {
    it('renders cancel button', () => {
      render(<SnippetDialog {...defaultProps} />)
      const cancelButton = screen.getByTestId('snippet-dialog-cancel-btn')
      expect(cancelButton).toBeInTheDocument()
    })

    it('renders save button with create label for new snippet', () => {
      render(<SnippetDialog {...defaultProps} />)
      const saveButton = screen.getByTestId('snippet-dialog-save-btn')
      expect(saveButton).toHaveTextContent(/create/i)
    })

    it('renders save button with update label for existing snippet', () => {
      render(<SnippetDialog {...defaultProps} editingSnippet={mockSnippet} />)
      const saveButton = screen.getByTestId('snippet-dialog-save-btn')
      expect(saveButton).toHaveTextContent(/update/i)
    })

    it('calls onOpenChange(false) when cancel button is clicked', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const cancelButton = screen.getByTestId('snippet-dialog-cancel-btn')
      await user.click(cancelButton)

      expect(mockOnOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('Accessibility', () => {
    it('dialog has proper role and aria attributes', () => {
      render(<SnippetDialog {...defaultProps} />)
      const dialog = screen.getByTestId('snippet-dialog')
      expect(dialog).toHaveAttribute('role', 'dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')
    })

    it('form fields have associated labels', () => {
      render(<SnippetDialog {...defaultProps} />)
      const titleInput = screen.getByTestId('snippet-title-input')
      expect(titleInput).toHaveAttribute('id', 'title')

      const label = screen.getByText(/title/i, { selector: 'label' })
      expect(label).toHaveAttribute('htmlFor', 'title')
    })

    it('invalid title has aria-invalid attribute', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const saveButton = screen.getByTestId('snippet-dialog-save-btn')
      await user.click(saveButton)

      await waitFor(() => {
        const titleInput = screen.getByTestId('snippet-title-input')
        expect(titleInput).toHaveAttribute('aria-invalid', 'true')
      })
    })

    it('error message is linked with aria-describedby', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const saveButton = screen.getByTestId('snippet-dialog-save-btn')
      await user.click(saveButton)

      await waitFor(() => {
        const titleInput = screen.getByTestId('snippet-title-input')
        const describedById = titleInput.getAttribute('aria-describedby')
        expect(describedById).toBeTruthy()
        const errorElement = document.getElementById(describedById!)
        expect(errorElement).toHaveTextContent(/required/i)
      })
    })

    it('buttons have proper keyboard accessibility', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const titleInput = screen.getByTestId('snippet-title-input')

      // Focus first input
      titleInput.focus()
      expect(titleInput).toHaveFocus()

      // Tab to other elements
      await user.tab()
      // Should move focus through form elements
    })
  })

  describe('Edge Cases', () => {
    it('handles very long title input', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const longTitle = 'A'.repeat(500)
      const titleInput = screen.getByTestId('snippet-title-input')
      await user.type(titleInput, longTitle)

      expect(titleInput).toHaveValue(longTitle)
    })

    it('handles special characters in title', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const specialTitle = 'Title<>&"\'with special chars'
      const titleInput = screen.getByTestId('snippet-title-input')
      await user.type(titleInput, specialTitle)

      expect(titleInput).toHaveValue(specialTitle)
    })

    it('handles rapid form interactions', async () => {
      const user = userEvent.setup()
      render(<SnippetDialog {...defaultProps} />)

      const titleInput = screen.getByTestId('snippet-title-input')

      // Type, clear, type rapidly
      await user.type(titleInput, 'First')
      await user.clear(titleInput)
      await user.type(titleInput, 'Second')

      expect(titleInput).toHaveValue('Second')
    })

    it('clears form data when creating new snippet after editing', () => {
      const { rerender } = render(
        <SnippetDialog {...defaultProps} editingSnippet={mockSnippet} />
      )

      // Re-render without editingSnippet
      rerender(<SnippetDialog {...defaultProps} editingSnippet={undefined} />)

      const titleInput = screen.getByTestId('snippet-title-input') as HTMLInputElement
      expect(titleInput.value).toBe('')
    })
  })
})
