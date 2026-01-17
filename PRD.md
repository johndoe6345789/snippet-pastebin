# Planning Guide

A developer-focused pastebin application for quickly saving, organizing, and sharing code snippets with beautiful syntax highlighting.

**Experience Qualities**: 
1. **Efficient** - Lightning-fast snippet creation and sharing with minimal friction, optimized for developers who need to paste and share code instantly.
2. **Organized** - Intuitive search and filtering that makes finding and managing snippets effortless.
3. **Delightful** - Beautiful syntax highlighting, smooth interactions, and a refined interface that makes code sharing feel premium.

**Complexity Level**: Light Application (multiple features with basic state) - A pastebin focused on create, view, organize, and search functionality, with an optional component library showcase accessible via hamburger menu.

## Essential Features

**Snippet Creation**
- Functionality: Quick form to paste code, add title/description, select language
- Purpose: Enable rapid snippet sharing and storage
- Trigger: Click "New Snippet" button from main view
- Progression: User clicks new snippet → Dialog appears → User pastes code → Adds title/description/language → Saves → Returns to grid with new snippet visible
- Success criteria: Snippet appears in grid immediately with proper syntax highlighting

**Snippet Viewing**
- Functionality: Full-screen viewer with syntax highlighting and copy functionality
- Purpose: Easy reading and copying of saved snippets
- Trigger: Click on any snippet card
- Progression: User clicks snippet → Full viewer opens → User reads code → Copies if needed → Closes viewer
- Success criteria: Code displays with proper formatting, copy works reliably

**Snippet Organization**
- Functionality: Real-time search across title, description, language, and code content
- Purpose: Easy management of growing snippet collections
- Progression: User types in search → Results filter instantly → User finds desired snippet
- Success criteria: Search responds within 100ms, filters accurately

**Snippet Management**
- Functionality: Edit and delete actions on each snippet
- Purpose: Allow users to maintain their snippet library
- Trigger: Click edit/delete buttons on snippet cards
- Progression: Edit: Opens dialog with pre-filled data → User modifies → Saves → Updates in place. Delete: Shows confirmation → User confirms → Snippet removed
- Success criteria: Changes persist, UI updates smoothly

**Component Library (Secondary Feature)**
- Functionality: Showcase of design system components with code examples
- Purpose: Secondary reference for exploring UI components used in the app
- Trigger: Click hamburger menu icon
- Progression: User opens menu → Browses component categories (Atoms/Molecules/Organisms/Templates) → Views examples → Copies code if needed
- Success criteria: Accessible but not primary focus of the interface

## Edge Case Handling
- **Empty State**: Welcoming empty state with clear CTA when no snippets exist
- **No Search Results**: Friendly message when search yields no matches
- **Long Code**: Handle large snippets with scrollable code blocks and line numbers
- **Duplicate Titles**: Allow duplicates, use unique IDs for management
- **Empty Fields**: Validate required fields before saving

## Design Direction
The design should evoke **precision, creativity, and technical excellence** - a tool that feels powerful yet approachable, modern yet focused on functionality.

## Color Selection
A developer-focused palette with strong contrast and code editor aesthetics inspired by modern IDEs.

- **Primary Color**: Electric Violet (oklch(0.55 0.20 280)) - Modern and tech-forward, represents innovation
- **Secondary Colors**: Deep Slate backgrounds (oklch(0.18 0.02 280)) for cards, slightly lighter than base background
- **Accent Color**: Neon Cyan (oklch(0.75 0.18 200)) - Eye-catching highlights for CTAs and important interactions
- **Foreground/Background Pairings**: 
  - Primary (Electric Violet oklch(0.55 0.20 280)): White text (oklch(0.98 0 0)) - Ratio 7.2:1 ✓
  - Card (Deep Slate oklch(0.18 0.02 280)): Bright White (oklch(0.96 0.01 280)) - Ratio 8.5:1 ✓
  - Accent (Neon Cyan oklch(0.75 0.18 200)): Dark Card Background (oklch(0.18 0.02 280)) - Ratio 6.8:1 ✓
  - Background (Dark Base oklch(0.10 0.01 280)): Foreground (oklch(0.96 0.01 280)) - Ratio 13.2:1 ✓

## Font Selection
Typography should feel technical yet refined, optimized for code readability and developer content.

- **Typographic Hierarchy**: 
  - App Title: Inter Bold/24px/tight letter-spacing (-0.02em) for brand identity
  - Section Headers: Inter Semibold/20px/normal for clear hierarchy
  - Body Text: Inter Regular/14px/relaxed (1.5 line-height) for readability
  - Code Blocks: JetBrains Mono Regular/13px/monospace with ligatures
  - Snippet Titles: Inter Medium/16px/normal for card headings
  - Metadata: Inter Regular/12px/muted color for timestamps and tags

## Animations
Animations should provide feedback and guide attention without slowing workflow - subtle micro-interactions that feel polished.

- **Page Load**: Gentle fade-up (opacity 0→1, translateY 20→0) over 400ms with stagger
- **Card Hover**: Subtle scale (1→1.02) and shadow increase over 200ms with ease-out
- **Dialog Open/Close**: Scale and fade with backdrop blur transition over 250ms
- **Button Press**: Quick scale down (1→0.98) over 100ms for tactile feedback
- **Toast Notifications**: Slide in from bottom with bounce easing over 300ms

## Component Selection

- **Components**: 
  - Dialog (shadcn) for creating/editing snippets - modal focus
  - Sheet (shadcn) for hamburger menu sidebar with component library
  - Button (shadcn) for all actions with icon+text variants
  - Input (shadcn) for search and form fields with focus states
  - Textarea (shadcn) for code input with monospace styling
  - Card (shadcn) for snippet cards with hover effects
  - Badge (shadcn) for language tags with color coding
  - Select (shadcn) for language picker dropdown
  - Tabs (shadcn) for component library categories
  - Alert Dialog (shadcn) for delete confirmations
  
- **Customizations**: 
  - Monaco Editor for code input with syntax highlighting
  - Custom code viewer component with copy button
  - Grid layout responsive system (1/2/3 columns)
  
- **States**: 
  - Buttons: Rest → Hover (brightness increase) → Active (scale down) → Disabled (opacity 50%)
  - Cards: Rest → Hover (lift shadow, scale) → Active (border accent color)
  - Form inputs: Empty → Focus (accent ring) → Filled (muted background) → Error (destructive border)
  
- **Icon Selection**: 
  - Plus (bold) for new snippet creation
  - List (bold) for hamburger menu
  - Pencil (regular) for edit
  - Trash (regular) for delete
  - Copy (regular) for copy code
  - MagnifyingGlass (regular) for search
  - Code (bold) for app logo
  - X (regular) for close/dismiss
  
- **Spacing**: 
  - Page container: px-6 py-8
  - Snippet grid: gap-6 (24px)
  - Form sections: space-y-6 (24px)
  - Card internal: p-6
  - Button groups: gap-2 (8px)
  - Header: py-6 (24px vertical)
  
- **Mobile**: 
  - Single column snippet grid below 768px
  - Simplified header with hamburger always visible
  - Full-width dialogs on mobile with sheet-style presentation
  - Touch-optimized button sizes (min 44px tap targets)
  - Code blocks scrollable horizontally with sticky line numbers
