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
- **Functionality**: Users can create a new code snippet with title, description, language selection, and code content using Monaco Editor for enhanced code editing
- **Purpose**: Core value proposition - storing reusable code for later retrieval with professional IDE-like experience
- **Trigger**: Click "New Snippet" button or keyboard shortcut
- **Progression**: Click New Snippet → Fill in title field → Select language from dropdown → Write/paste code in Monaco Editor with syntax highlighting → Add optional description → Click Save
- **Success criteria**: Snippet appears in the list immediately, persists across page refreshes, Monaco Editor loads lazily without blocking UI, and code is searchable

### View & Organize Snippets
- **Functionality**: Display all snippets in a filterable list with preview cards showing title, language, and truncated code; click to open full-screen Monaco viewer
- **Purpose**: Quick scanning and navigation through saved snippets with professional code viewing
- **Trigger**: Default view on app load, click card to view full code
- **Progression**: View list → Scan titles and languages → Click card to open full-screen Monaco viewer with syntax highlighting → Copy or edit from viewer
- **Success criteria**: All snippets visible, sorted by recent first, viewer opens instantly with lazy-loaded Monaco Editor

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

## Edge Case Handling
- **Empty State**: Show welcoming illustration and "Create your first snippet" CTA when no snippets exist
- **Long Code Blocks**: Truncate preview with "Show more" expansion, scroll within card for full view
- **Duplicate Titles**: Allow duplicates but show language badge to differentiate
- **Invalid Input**: Require title and code content minimum, show inline validation errors
- **Search No Results**: Display "No snippets found" message with suggestion to adjust filters
- **Network/Storage Errors**: Graceful error messages with retry options (though KV storage is local)

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
  - Badge for language tags with color coding
  - ScrollArea for long code blocks within cards
  - Toast (Sonner) for copy confirmations and success messages
  - AlertDialog for delete confirmations
  
- **Customizations**: 
  - Custom syntax language badges with predefined color mapping (JavaScript=yellow, Python=blue, etc.)
  - Floating action button for "New Snippet" with plus icon, fixed bottom-right on mobile
  - Custom empty state component with illustration or icon and encouraging copy
  
- **States**: 
  - Buttons: Default with subtle gradient, hover with brightness increase and shadow, active with slight scale-down (0.98), disabled with 50% opacity
  - Cards: Default flat, hover with shadow-lg and border glow, selected/expanded with accent border
  - Inputs: Default with muted border, focus with accent ring and border color shift, error with red ring
  
- **Icon Selection**: 
  - Plus (create new snippet)
  - Copy (clipboard action) 
  - Pencil (edit action)
  - Trash (delete action)
  - MagnifyingGlass (search)
  - Code (app logo/branding)
  - Check (confirmation feedback)
  
- **Spacing**: 
  - Container padding: p-6 (desktop) / p-4 (mobile)
  - Card gaps: gap-4 for grid layout
  - Form fields: space-y-4 for vertical stacking
  - Section margins: mb-8 for major sections
  - Inline elements: gap-2 for icon+text combinations
  
- **Mobile**: 
  - Single column card layout with full-width cards
  - Dialog becomes full-screen sheet on mobile
  - Search bar remains sticky at top
  - Floating action button (FAB) for create action instead of header button
  - Touch-friendly button sizes (min 44px tap targets)
  - Bottom sheet for language filter on mobile vs. dropdown on desktop
