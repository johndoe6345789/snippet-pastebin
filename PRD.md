# Planning Guide

A modern snippet pastebin for developers to share, organize, and discover code snippets with syntax highlighting, live previews, and organized collections.

**Experience Qualities**: 
1. **Efficient** - Quick snippet creation and sharing with minimal friction, optimized for developers who need to paste and share code instantly.
2. **Organized** - Clear categorization and filtering that makes finding and managing snippets effortless.
3. **Delightful** - Beautiful syntax highlighting, smooth interactions, and a refined interface that makes code sharing feel premium.

**Complexity Level**: Light Application (multiple features with basic state) - A pastebin with create, view, organize, and search functionality, with an additional component library showcase as a secondary feature.

## Essential Features

**Snippet Creation**
- Functionality: Quick form to paste code, add title/description, select language
- Purpose: Enable rapid snippet sharing and storage
- Trigger: Click "New Snippet" button or land on homepage
- Progression: User clicks new snippet → Form appears → User pastes code → Adds metadata → Saves → Snippet displays with shareable view
- Success criteria: Form is fast, syntax highlighting preview works, saving is instant

**Snippet Viewing**
- Functionality: Display snippet with syntax highlighting, metadata, and actions
- Purpose: Beautiful presentation of code with copy functionality
- Trigger: Click on snippet card or navigate to snippet
- Progression: User selects snippet → Full view displays → Code renders with highlighting → User can copy/edit/delete
- Success criteria: Code is readable, actions are clear, copying works smoothly

**Snippet Organization**
- Functionality: Filter and sort snippets by language, category, or date
- Purpose: Easy management of growing snippet collections
- Trigger: Use filter controls or search
- Progression: User applies filter → Results update instantly → Snippets display organized → Clear indication of active filters
- Success criteria: Filtering is instant, results are accurate, empty states are helpful

**Code Preview (for React/HTML)**
- Functionality: Live preview of React components and HTML snippets
- Purpose: See rendered output alongside code
- Trigger: Automatic for supported languages
- Progression: Snippet loads → Preview compiles → Rendered result displays → Preview updates on edit
- Success criteria: Preview renders accurately, errors are handled gracefully

**Component Library (Secondary Feature)**
- Functionality: Showcase of atomic design components accessible via hamburger menu
- Purpose: Secondary reference for design system components
- Trigger: Click hamburger menu → Select "Components"
- Progression: User opens menu → Selects component section → Components display → User can save examples as snippets
- Success criteria: Easy access from menu, can be dismissed, components can be copied to main snippets

## Edge Case Handling

- **Empty State**: Show welcoming empty state with "Create your first snippet" CTA
- **Long Code**: Handle large snippets with scrollable code blocks and truncation in list view
- **Invalid Code**: Show preview gracefully when code doesn't compile
- **No Language Selected**: Default to plain text with no highlighting
- **Mobile View**: Single column layout, simplified toolbar, collapsible sections
- **Duplicate Titles**: Allow duplicates but show creation date for disambiguation

## Design Direction

The design should evoke **precision, creativity, and speed** - like a beautifully crafted developer tool that feels both powerful and approachable. The interface should feel like a premium code editor with rich syntax highlighting, smooth animations, and thoughtful spacing that makes code the hero.

## Color Selection

A developer-focused palette with strong contrast and code editor aesthetics.

- **Primary Color**: Electric Violet (oklch(0.55 0.20 280)) - Modern and technical, used for primary actions and highlights
- **Secondary Colors**: 
  - Deep Slate (oklch(0.18 0.02 280)) for elevated surfaces and cards
  - Muted Indigo (oklch(0.28 0.04 280)) for secondary elements and borders
- **Accent Color**: Neon Cyan (oklch(0.75 0.18 200)) - Eye-catching highlight for active states, syntax elements, and CTAs
- **Background**: Rich Black (oklch(0.10 0.01 280)) - Deep, focused background
- **Foreground/Background Pairings**: 
  - Background (Rich Black oklch(0.10 0.01 280)): Bright White (oklch(0.96 0.01 280)) - Ratio 16.2:1 ✓
  - Primary (Electric Violet oklch(0.55 0.20 280)): White text (oklch(0.98 0 0)) - Ratio 5.8:1 ✓
  - Accent (Neon Cyan oklch(0.75 0.18 200)): Deep Slate text (oklch(0.18 0.02 280)) - Ratio 9.8:1 ✓
  - Card (Deep Slate oklch(0.18 0.02 280)): Bright White (oklch(0.96 0.01 280)) - Ratio 12.5:1 ✓

## Font Selection

Typography should feel technical yet refined, optimized for reading code and developer content.

- **Typographic Hierarchy**: 
  - App Title: JetBrains Mono Bold/32px/tight spacing - Technical and distinctive
  - Section Headers: Inter Semibold/24px/normal spacing - Clean hierarchy
  - Snippet Titles: Inter Medium/18px/normal spacing - Clear labels
  - Body Text: Inter Regular/15px/relaxed line-height - Comfortable reading
  - Code: JetBrains Mono Regular/14px/monospace - Optimal code readability

## Animations

Animations should feel snappy and developer-focused - snippets should fade in with slight upward motion (200ms), the new snippet form should slide in smoothly (250ms), syntax highlighting should appear progressively, copy actions should provide instant visual feedback with a subtle scale pulse, and the hamburger menu should slide from the side with backdrop fade. Hover states are quick (100ms) while view transitions use 200ms for clarity.

## Component Selection

- **Components**: 
  - Sheet (shadcn) for hamburger menu sidebar
  - Card (shadcn) for snippet cards with hover elevation
  - Button (shadcn) for all actions with icon variants
  - Input (shadcn) for search and form fields
  - Select (shadcn) for language and category selection
  - Textarea (shadcn) for code input
  - Badge (shadcn) for language tags and metadata
  - Separator (shadcn) for visual grouping
  - Dialog (shadcn) for delete confirmations
  - Scroll Area (shadcn) for code display
  - Tabs (shadcn) for code/preview toggle
- **Customizations**: 
  - Custom syntax highlighter using Monaco editor for code display
  - Snippet preview component with live rendering for React/HTML
  - Filter bar component with combined search/language/sort controls
  - Empty state component with illustration and CTA
  - Copy button with success animation
  - Floating action button for new snippet (mobile)
- **States**: 
  - Cards: subtle shadow on default, lift on hover with accent border, selected state with accent glow
  - Buttons: primary uses accent gradient, hover brightens, active depresses, copy button shows checkmark on success
  - Menu: backdrop darkens when open, sheet slides in from left with spring animation
  - Form inputs: focus shows accent ring, filled state has subtle background
- **Icon Selection**: 
  - Plus (bold) for new snippet
  - Copy (regular) for copy action with check animation
  - List (bold) for hamburger menu
  - Code (bold) for snippet icon
  - Trash (regular) for delete
  - MagnifyingGlass (regular) for search
  - FunnelSimple (regular) for filters
  - Eye (regular) for preview toggle
- **Spacing**: 
  - Page container: px-6 py-8
  - Snippet grid: gap-6
  - Card padding: p-5
  - Form sections: space-y-6
  - Input grouping: gap-3
  - Tight groups: gap-2
- **Mobile**: 
  - Single column snippet grid
  - Floating action button (bottom right) for new snippet
  - Simplified header with just logo and menu
  - Full-screen snippet view on mobile
  - Reduce title sizes proportionally
  - Maintain 44px touch targets
  - Code blocks scroll horizontally with syntax wrap option
