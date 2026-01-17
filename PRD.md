# Planning Guide

A developer-focused code snippet manager that allows users to save, organize, search, and quickly access reusable code snippets across multiple programming languages.

**Experience Qualities**:
1. **Efficient** - Users should be able to save and retrieve snippets in seconds with minimal friction
2. **Professional** - The interface should feel polished and trustworthy, suitable for daily developer workflow
3. **Intuitive** - Navigation and organization should be self-evident without requiring documentation

**Complexity Level**: Light Application (multiple features with basic state)
This is a CRUD application with search, filtering, and organization features but doesn't require complex routing or advanced state management beyond persisted storage.

## Essential Features

### Create Snippet
- **Functionality**: Users can create a new code snippet with title, description, language selection, code content using Monaco Editor, and optional preview mode for React components
- **Purpose**: Core value proposition - storing reusable code for later retrieval with professional IDE-like experience and live preview capability for React snippets
- **Trigger**: Click "New Snippet" button or keyboard shortcut
- **Progression**: Click New Snippet → Fill in title field → Select language from dropdown (including JSX/TSX options) → Toggle preview mode checkbox if creating React component → Write/paste code in Monaco Editor with syntax highlighting → Add optional description → Click Save
- **Success criteria**: Snippet appears in the list immediately with preview badge if enabled, persists across page refreshes, Monaco Editor loads lazily without blocking UI, and code is searchable

### View & Organize Snippets
- **Functionality**: Display all snippets in a filterable list with preview cards showing title, language, preview badge, and truncated code; click to open full-screen Monaco viewer with optional split-screen preview
- **Purpose**: Quick scanning and navigation through saved snippets with professional code viewing and live React component preview
- **Trigger**: Default view on app load, click card to view full code
- **Progression**: View list → Scan titles, languages, and preview badges → Click card to open full-screen viewer with syntax highlighting → Toggle split-screen preview for React components → Copy or edit from viewer
- **Success criteria**: All snippets visible, sorted by recent first, viewer opens instantly with lazy-loaded Monaco Editor, preview renders React components in real-time

### Split-Screen Preview
- **Functionality**: For React-compatible snippets (JSX/TSX/JavaScript/TypeScript), render live preview alongside code editor in split-screen layout
- **Purpose**: Enable developers to see React components rendered in real-time, test UI snippets instantly, and save complete working component examples
- **Trigger**: Enable preview mode checkbox when creating/editing snippet, toggle preview button in viewer
- **Progression**: Create snippet with JSX/TSX → Check "Enable preview" → Save → Open viewer → See code on left, live preview on right → Toggle preview on/off as needed
- **Success criteria**: React code compiles and renders safely, errors display helpful messages, preview updates reflect code changes, supports React hooks and JSX syntax

### Search & Filter
- **Functionality**: Real-time search across snippet titles, descriptions, and code content; filter by programming language
- **Purpose**: Quick retrieval when snippet library grows large
- **Trigger**: Type in search bar or select language filter
- **Progression**: Type search query → Results filter in real-time → Clear search to return to full list
- **Success criteria**: Results appear instantly (<100ms), search is case-insensitive, highlights matched terms

### Edit & Delete
- **Functionality**: Modify existing snippets using Monaco Editor or remove them entirely
- **Purpose**: Keep snippet library current and relevant with professional editing experience
- **Trigger**: Click edit icon on snippet card or from viewer, click delete with confirmation
- **Progression**: Click Edit → Monaco Editor opens with existing code → Modify fields with syntax highlighting → Save changes → See updated snippet in list
- **Success criteria**: Changes persist, Monaco Editor retains user edits, delete requires confirmation, no accidental data loss

### Copy to Clipboard
- **Functionality**: One-click copy of code content to clipboard
- **Purpose**: Primary use case - quickly use snippets in other projects
- **Trigger**: Click copy icon on snippet card
- **Progression**: Click copy button → Visual feedback (toast notification) → Paste code elsewhere
- **Success criteria**: Code copies exactly as stored, toast confirms action, works across browsers

### AI Error Helper
- **Functionality**: Intelligent error analysis button that appears when errors occur, uses AI to explain errors in plain language and suggest fixes
- **Purpose**: Help developers quickly understand and resolve errors without leaving the app
- **Trigger**: Automatically appears when runtime errors, preview rendering errors, or validation errors occur
- **Progression**: Error occurs → AI helper button appears with pulsing animation → Click button → AI analyzes error context → Display explanation and suggested fixes in dialog
- **Success criteria**: Button appears within 100ms of error, AI provides helpful context-aware explanations, suggestions are actionable and specific to the error type

## Edge Case Handling
- **Empty State**: Show welcoming illustration and "Create your first snippet" CTA when no snippets exist
- **Long Code Blocks**: Truncate preview with "Show more" expansion, scroll within card for full view
- **Duplicate Titles**: Allow duplicates but show language badge to differentiate
- **Invalid Input**: Require title and code content minimum, show inline validation errors
- **Search No Results**: Display "No snippets found" message with suggestion to adjust filters
- **Network/Storage Errors**: Graceful error messages with retry options (though KV storage is local)
- **Preview Rendering Errors**: Display detailed error messages when React code fails to compile or render, show warnings for non-React language previews, AI helper button available for error analysis
- **Preview Not Available**: Show informative message for snippets without preview enabled or non-React languages
- **AI Error Analysis Failure**: If AI service is unavailable, show graceful fallback message with standard error details

## Design Direction
The design should evoke a premium developer tool - clean, focused, and sophisticated with subtle tech-forward aesthetics. Think VS Code meets Notion: professional minimalism with purposeful color accents and smooth micro-interactions that make frequent use satisfying.

## Color Selection
A developer-focused dark-leaning palette with vibrant accent colors for actions and syntax language tags.

- **Primary Color**: Deep indigo `oklch(0.35 0.15 265)` - Communicates technical sophistication and trust, used for primary actions and headers
- **Secondary Colors**: Charcoal gray `oklch(0.25 0.01 265)` for cards/surfaces; Soft gray `oklch(0.65 0.01 265)` for secondary text
- **Accent Color**: Electric cyan `oklch(0.75 0.15 195)` - Attention-grabbing highlight for CTAs, copy actions, and success states
- **Foreground/Background Pairings**:
  - Background (Off-black #0F0F14 / oklch(0.08 0.01 265)): Light gray text (oklch(0.95 0.01 265) #F0F0F2) - Ratio 11.2:1 ✓
  - Card surface (oklch(0.15 0.01 265)): White text (oklch(0.98 0 0)) - Ratio 13.5:1 ✓
  - Primary (Deep indigo oklch(0.35 0.15 265)): White text (oklch(0.98 0 0)) - Ratio 7.8:1 ✓
  - Accent (Cyan oklch(0.75 0.15 195)): Deep gray text (oklch(0.15 0.01 265)) - Ratio 8.5:1 ✓

## Font Selection
Typography should balance technical precision with readability - a clean geometric sans for UI elements and a monospace font for code display that developers recognize and trust.

- **Typographic Hierarchy**:
  - H1 (App Title): Space Grotesk Bold/32px/tight letter spacing (-0.02em)
  - H2 (Section Headers): Space Grotesk SemiBold/20px/normal spacing
  - Body (UI Text): Space Grotesk Regular/15px/1.5 line height
  - Code Display: JetBrains Mono Regular/14px/1.6 line height
  - Labels & Captions: Space Grotesk Medium/13px/uppercase with increased tracking (0.05em)

## Animations
Animations should feel responsive and technical - quick, purposeful movements that provide feedback without delay. Focus on micro-interactions: button states that respond instantly, smooth card expansions when viewing details, and satisfying confirmation animations when copying code (scale pulse + checkmark). Keep transitions under 200ms for interactions, 300ms max for layout changes. Use ease-out curves for most interactions to feel snappy.

## Component Selection
- **Components**: 
  - Dialog for create/edit snippet forms with full-screen modal feel on mobile
  - Card for snippet list items with hover elevation and click interaction
  - Input for search bar with clear button and icon
  - Button for all actions (primary solid style for Save/Create, ghost style for secondary actions)
  - Select for language dropdown with custom styling to match theme
  - Textarea for code input with monospace font
  - Badge for language tags with color coding, preview indicator badge with split-screen icon
  - ScrollArea for long code blocks within cards
  - Toast (Sonner) for copy confirmations and success messages
  - AlertDialog for delete confirmations
  - Checkbox for enabling split-screen preview mode
  - Alert for displaying preview rendering errors
  - Custom AI helper button with sparkle/magic wand icon for error analysis
  
- **Customizations**: 
  - Custom syntax language badges with predefined color mapping (JavaScript=yellow, Python=blue, JSX/TSX=cyan/sky, etc.)
  - Floating action button for "New Snippet" with plus icon, fixed bottom-right on mobile
  - Custom empty state component with illustration or icon and encouraging copy
  - Split-screen preview renderer with safe React code execution
  - Preview badge with split-screen icon to indicate preview-enabled snippets
  
- **States**: 
  - Buttons: Default with subtle gradient, hover with brightness increase and shadow, active with slight scale-down (0.98), disabled with 50% opacity, toggle state for preview on/off
  - Cards: Default flat, hover with shadow-lg and border glow, selected/expanded with accent border, preview badge visible when enabled
  - Inputs: Default with muted border, focus with accent ring and border color shift, error with red ring
  - Preview pane: Loading state, error state with helpful message, rendered state with scrolling
  
- **Icon Selection**: 
  - Plus (create new snippet)
  - Copy (clipboard action) 
  - Pencil (edit action)
  - Trash (delete action)
  - MagnifyingGlass (search)
  - Code (app logo/branding)
  - Check (confirmation feedback)
  - SplitVertical (preview mode indicator and toggle)
  - WarningCircle (preview errors)
  - Sparkles/MagicWand (AI helper for error analysis)
  
- **Spacing**: 
  - Container padding: p-6 (desktop) / p-4 (mobile)
  - Card gaps: gap-4 for grid layout
  - Form fields: space-y-4 for vertical stacking
  - Section margins: mb-8 for major sections
  - Inline elements: gap-2 for icon+text combinations
  - Split-screen: Equal 50/50 width distribution with border separator
  
- **Mobile**: 
  - Single column card layout with full-width cards
  - Dialog becomes full-screen sheet on mobile
  - Search bar remains sticky at top
  - Floating action button (FAB) for create action instead of header button
  - Touch-friendly button sizes (min 44px tap targets)
  - Bottom sheet for language filter on mobile vs. dropdown on desktop
  - Preview stacks vertically below code editor on small screens
