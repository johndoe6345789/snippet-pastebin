# Planning Guide

**Experience Qualities**: 

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
- Functionality: Showcase of design system components
- Trigger: Click hamburger menu icon
- Success criteria: Accessible but not primary focus of 

- **No Search Results**: Friendly message
- **Duplicate Titles**: Allow duplicates, use unique IDs for management

The design should evoke **precision,
## Color Selection


- **Foreground/Backgr
  - Card (Deep Slate oklch(0.18 0.02 280)): Bright White (oklch(0.96 0.01 280)
  - Background (Dark Base oklch(0.10 0.01 280)): Foreground (oklch(0.96
## Font Selection

  - App Title: Inter Bold/24px/tight letter-spacing (-0.02

  - Snippet Titles:


- **Page Load**: G
- **Dialog Open/Close**: Scale and fade with backdrop blur transition over 250ms

## Component Selection
- **Components**: 
  - Sheet (shadcn) for hamburger menu sidebar with component library
  - Input (shadcn) for search and form
  - Card (shadcn) for snippet cards with hover effects
  - Select (shadcn) for language picker dropdown
  - Alert Dialog (shadcn) for delete confirmations
- **Customizations**: 

  
  - Buttons: Rest → Hover (brightness increase) → Active (scale down) → Disabled (opacity 50%)

- **Icon Selection**: 
  - List (bold) for hamburger menu
  - Trash (regular) for delete
  - MagnifyingGlass (regular) for search
  - X (regular) for close/dismiss
- **Spacing**: 
  - Snippet grid: gap-6 (24px)

  - Header: p
- **Mobile**: 

  - Touch-optimized button sizes (min 44px tap targets)





















































