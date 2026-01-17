# Planning Guide

**Experience Qualities**: 

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
- Trigger: Click on snippet card or navigate to snippet

**Snippet Organizat
- Purpose: Easy management of growing snippet collections
- Progression: User applies filter → Results update instantly → S

- Functionality: Live preview of React components and HTML snippets
- Trigger: Automatic for supported languages

**Component Library (Sec
- Purpose: Secondary reference for design system components
- Progression: User opens menu → Selects component sectio


- **Long Code**: Handle large snippets with scrollable code blocks and truncation in lis

- **Duplicate Titles**: Allow dup
## Design Direction
The design should evoke **precision, creativi
## Color Selection
A developer-focused palette with strong contrast and code editor aesthetics.
- **Primary Color**: Electric Violet (oklch(0.55 0.20 280)) - Modern and tech

- **Accent Color**: Neon Cyan (oklch(0.75
- **Foreground/Background Pairings**: 
  - Primary (Electric Violet oklch(0.55 0.20 280)): White t
  - Card (Deep Slate oklch(0.18 0.02 280)): Bright Wh
## Font Selection
Typography should feel technical yet refined, optimized for reading code and developer content.

  - Section Headers: 





  - Sheet (shadcn) for hamburger menu sidebar
  - Button (shadcn) for all actions with icon variants

  - Badge (shadcn) 

  - Tabs (shadcn) for code/preview toggle

  - Filter bar com

- **States**: 

  - Form inputs: focus shows accent ring, filled state has subtle background
  - Plus (bold) for new 
  - List (bold) for hamburger menu
  - Trash (regular) for delete
  - FunnelSimple (regular) for filters
- **Spacing**: 
  - Snippet grid: gap-6
  - Form sections: space-y-6
  - Tight groups: gap-2
  - Single column snippet grid
  - Simplified header with just logo and menu

  - Code blocks s
































































