# Planning Guide

A simple, interactive counter application that allows users to increment and decrement a numerical value with clear visual feedback.

**Experience Qualities**: 
1. **Playful** - The counter should feel fun and responsive, encouraging interaction through satisfying button clicks and smooth animations.
2. **Clear** - The current count value should be immediately obvious and easy to read at any time.
3. **Tactile** - Button interactions should provide strong visual feedback that makes the interface feel physical and responsive.

**Complexity Level**: Micro Tool (single-purpose application) - This is a focused counter with a single clear purpose: track a numerical value through increment and decrement actions.

## Essential Features

**Increment Counter**
- Functionality: Increases the counter value by 1
- Purpose: Allows users to count up for any tracking need
- Trigger: Click/tap the increment (+) button
- Progression: User clicks button → Value increases by 1 → New value displays with brief animation
- Success criteria: Counter value increases correctly and persists between sessions

**Decrement Counter**
- Functionality: Decreases the counter value by 1
- Purpose: Allows users to count down or correct mistakes
- Trigger: Click/tap the decrement (-) button
- Progression: User clicks button → Value decreases by 1 → New value displays with brief animation
- Success criteria: Counter value decreases correctly and persists between sessions

**Reset Counter**
- Functionality: Returns the counter to zero
- Purpose: Quickly start fresh without multiple decrements
- Trigger: Click/tap the reset button
- Progression: User clicks reset → Counter returns to 0 → Visual confirmation
- Success criteria: Counter resets to zero instantly

## Edge Case Handling

- **Negative Numbers**: Allow negative values - no lower limit restriction
- **Large Numbers**: Display properly formatted large numbers (with commas for readability)
- **Rapid Clicking**: Handle multiple rapid button presses smoothly without lag
- **Initial Load**: Start at 0 if no saved value exists

## Design Direction

The design should evoke a sense of **precision, control, and satisfaction** - like using a premium mechanical device. Think digital tally counter meets modern minimalism, with bold typography that makes the number feel important and tactile buttons that beg to be pressed.

## Color Selection

A bold, high-contrast scheme that feels modern and precise.

- **Primary Color**: Deep Electric Blue (oklch(0.45 0.20 240)) - Communicates precision and digital accuracy, used for primary action buttons
- **Secondary Colors**: 
  - Rich Navy (oklch(0.15 0.03 240)) for depth and cards
  - Slate Gray (oklch(0.25 0.02 240)) for secondary elements
- **Accent Color**: Vibrant Cyan (oklch(0.75 0.15 200)) - Eye-catching highlight for the counter value itself and focus states
- **Foreground/Background Pairings**: 
  - Background (Dark Navy oklch(0.10 0.02 240)): Light Gray text (oklch(0.95 0.01 240)) - Ratio 15.2:1 ✓
  - Primary (Electric Blue oklch(0.45 0.20 240)): White text (oklch(0.98 0 0)) - Ratio 5.8:1 ✓
  - Accent (Vibrant Cyan oklch(0.75 0.15 200)): Dark Navy text (oklch(0.10 0.02 240)) - Ratio 12.1:1 ✓

## Font Selection

Typography should feel technical yet approachable, with numeric characters that are highly legible and distinctive.

- **Typographic Hierarchy**: 
  - Counter Value: Space Grotesk Bold/96px/tight letter spacing - The hero element, large and commanding
  - Button Labels: Space Grotesk Medium/16px/normal spacing - Clear and readable
  - Secondary Text: Space Grotesk Regular/14px/relaxed spacing - Subtle guidance

## Animations

Animations should emphasize the counting action - the number should briefly scale and glow when changed, buttons should have satisfying press states with subtle scale transforms, and all transitions should use snappy easing (0.2s) to feel responsive. The reset action gets a more pronounced animation to signal the larger state change.

## Component Selection

- **Components**: 
  - Button (shadcn) for all interactive controls, with `size="lg"` for main increment/decrement, and `variant="outline"` for reset
  - Card (shadcn) as the main container for the counter interface
  - Separator (shadcn) to divide counter from controls
- **Customizations**: 
  - Custom counter display component with animated number transitions using framer-motion
  - Button hover/active states enhanced with scale transforms and glow effects
  - Gradient background pattern using CSS for visual interest
- **States**: 
  - Buttons: default has subtle shadow, hover scales to 1.05 and brightens, active scales to 0.95, disabled is muted
  - Counter display: pulses briefly on value change with scale animation
- **Icon Selection**: 
  - Plus (bold weight) for increment
  - Minus (bold weight) for decrement  
  - ArrowCounterClockwise (bold weight) for reset
- **Spacing**: 
  - Outer container: p-8
  - Card padding: p-12
  - Button gaps: gap-4
  - Section spacing: space-y-8
- **Mobile**: 
  - Stack buttons vertically on mobile with full-width layout
  - Reduce counter font size to 64px on small screens
  - Maintain tap-friendly 44px minimum touch targets
  - Card padding reduces to p-6 on mobile
