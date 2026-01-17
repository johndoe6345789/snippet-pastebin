# Planning Guide

A comprehensive atomic design system showcasing reusable component patterns organized by atomic design principles - demonstrating atoms, molecules, organisms, and templates in a living component library.

**Experience Qualities**: 
1. **Systematic** - Components should demonstrate clear organizational hierarchy from smallest atoms to complex organisms, making the design system easy to understand and navigate.
2. **Expressive** - Each component should showcase rich visual variety, multiple variants, states, and customization options that inspire creative usage.
3. **Practical** - Examples should reflect real-world use cases with working interactions, not just static displays.

**Complexity Level**: Content Showcase (information-focused) - This is a comprehensive component library that catalogs and demonstrates reusable design patterns, organized by atomic design principles with interactive examples.

## Essential Features

**Atomic Component Display**
- Functionality: Showcases fundamental building blocks (buttons, inputs, badges, icons, typography) with all variants and states
- Purpose: Demonstrates the smallest reusable units that compose larger patterns
- Trigger: Navigate to Atoms section
- Progression: User views section → Grid of atomic components displays → User can interact with live examples → Variants show different states
- Success criteria: All base components visible, interactive, showing hover/active/disabled states

**Molecular Component Display**
- Functionality: Displays composed components (form fields with labels, search bars, cards with actions, navigation items)
- Purpose: Shows how atoms combine into functional UI patterns
- Trigger: Navigate to Molecules section
- Progression: User views section → Composed components display → User interacts with working examples → Sees practical combinations
- Success criteria: Component compositions are clear, interactions work, relationships between atoms are visible

**Organism Component Display**
- Functionality: Presents complex components (navigation bars, data tables, forms, feature sections)
- Purpose: Demonstrates production-ready component patterns with full functionality
- Trigger: Navigate to Organisms section
- Progression: User views section → Complex patterns display → User interacts with realistic examples → Sees complete use cases
- Success criteria: Organisms feel production-ready, interactions are smooth, use cases are clear

**Template Showcase**
- Functionality: Shows complete page layouts combining multiple organisms
- Purpose: Demonstrates how all components work together in real applications
- Trigger: Navigate to Templates section
- Progression: User views section → Full page examples display → User sees complete compositions → Layout patterns are clear
- Success criteria: Templates show realistic page structures, responsive behavior visible

**Interactive Component Playground**
- Functionality: Live component customization with variant switching and prop controls
- Purpose: Allows experimentation with component options and configurations
- Trigger: Click on any component example
- Progression: User clicks component → Customization panel opens → User toggles variants → Component updates in real-time → Code snippet shows
- Success criteria: Controls work smoothly, visual feedback is immediate, code examples are accurate

**Navigation System**
- Functionality: Tabbed interface for switching between atomic levels with smooth transitions
- Purpose: Clear organization and easy browsing of the component hierarchy
- Trigger: Click tab or section link
- Progression: User clicks navigation → Smooth transition to section → Components load and display → Active state updates
- Success criteria: Navigation is intuitive, transitions are smooth, current location is always clear

## Edge Case Handling

- **Empty States**: Show placeholder when no components in a category
- **Long Content**: Handle component examples with overflow/truncation gracefully
- **Mobile View**: Adapt grid layouts to single column, stack complex examples
- **Interaction States**: Clearly show all states (default, hover, active, focus, disabled)
- **Variant Overflow**: Handle components with many variants using tabs or dropdowns
- **Code Display**: Syntax highlighting for code examples with copy functionality

## Design Direction

The design should evoke **craftsmanship, clarity, and inspiration** - like a meticulously organized workshop where every tool has its place. The interface should feel like a premium design system documentation site with rich visual examples, smooth interactions, and thoughtful categorization that makes finding the right component effortless.

## Color Selection

A sophisticated, artistic palette that breaks from typical design system documentation.

- **Primary Color**: Rich Plum (oklch(0.50 0.18 310)) - Distinctive and creative, used for primary actions and highlights
- **Secondary Colors**: 
  - Deep Purple (oklch(0.20 0.12 310)) for depth and elevated surfaces
  - Muted Violet (oklch(0.30 0.08 310)) for secondary elements and borders
- **Accent Color**: Vibrant Coral (oklch(0.72 0.20 25)) - Eye-catching warmth for active states, badges, and emphasis
- **Background**: Near Black (oklch(0.12 0.02 310)) - Rich dark foundation
- **Foreground/Background Pairings**: 
  - Background (Near Black oklch(0.12 0.02 310)): Light Lavender (oklch(0.94 0.02 310)) - Ratio 14.8:1 ✓
  - Primary (Rich Plum oklch(0.50 0.18 310)): White text (oklch(0.98 0 0)) - Ratio 6.2:1 ✓
  - Accent (Vibrant Coral oklch(0.72 0.20 25)): Deep Purple text (oklch(0.20 0.12 310)) - Ratio 8.5:1 ✓
  - Card (Deep Purple oklch(0.20 0.12 310)): Light Lavender (oklch(0.94 0.02 310)) - Ratio 11.2:1 ✓

## Font Selection

Typography should feel modern and editorial, with excellent readability for code and prose.

- **Typographic Hierarchy**: 
  - Page Title: Bricolage Grotesque Bold/48px/tight letter spacing - Editorial presence
  - Section Headers: Bricolage Grotesque Semibold/32px/normal spacing - Clear hierarchy
  - Component Names: Bricolage Grotesque Medium/20px/normal spacing - Distinctive labels
  - Body Text: Inter Regular/16px/relaxed line-height - Comfortable reading
  - Code: JetBrains Mono Regular/14px/monospace - Technical precision

## Animations

Animations should feel polished and purposeful - components should have subtle entrance animations using staggered fades, tabs should transition smoothly with sliding indicators, interactive elements should respond with gentle scale and color transitions (150-200ms), and the component playground should animate property changes. Hover states use quick 100ms transitions while section changes use slower 300ms fades for comprehension.

## Component Selection

- **Components**: 
  - Tabs (shadcn) for main navigation between atomic levels with underline indicator
  - Card (shadcn) for component examples with elevated shadow
  - Badge (shadcn) for variant labels and status indicators
  - Button (shadcn) for all interactive controls with multiple variants
  - Separator (shadcn) for visual grouping and section division
  - Dialog (shadcn) for component playground modal
  - Scroll Area (shadcn) for code examples and long content
  - Tooltip (shadcn) for additional component information
- **Customizations**: 
  - Custom grid system for component layout with responsive columns
  - Component preview frame with dark/light background toggle
  - Code block component with syntax highlighting using Monaco
  - Section header with animated gradient underline
  - Navigation breadcrumb for atomic level context
  - Variant switcher component for toggling between options
- **States**: 
  - Tabs: underline slides smoothly, active tab has accent color, inactive are muted
  - Cards: default has subtle shadow, hover lifts with larger shadow, active state slightly depressed
  - Buttons: comprehensive state examples (default, hover, active, focus, disabled, loading)
  - Interactive elements: scale slightly on hover (1.02), depress on active (0.98)
- **Icon Selection**: 
  - Atom (bold) for atomic level
  - MolecularStructure (bold) for molecular level
  - FlowArrow (bold) for organism level
  - Layout (bold) for templates
  - Code (regular) for code examples
  - Copy (regular) for copy actions
  - Eye (regular) for preview
  - Palette (regular) for theming
- **Spacing**: 
  - Page container: px-8 py-12
  - Section spacing: space-y-16
  - Component grid: gap-8
  - Card padding: p-6
  - Inner component spacing: gap-4
  - Tight groupings: gap-2
- **Mobile**: 
  - Single column layout for component grids
  - Tabs become full-width scrollable with arrows
  - Reduce title sizes: Page Title 32px, Section Headers 24px
  - Card padding reduces to p-4
  - Stack playground controls vertically
  - Maintain 44px touch targets for all interactive elements
