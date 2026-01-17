# Planning Guide

A unique, constraint-based counter application where reaching a new maximum permanently limits future counting to half that value - creating an intriguing game of strategic counting.

**Experience Qualities**: 
1. **Intriguing** - The counter should create curiosity and tension as users discover the constraint mechanic and consider their counting strategy.
2. **Clear** - The current count value and imposed limits should be immediately obvious and easy to understand.
3. **Consequential** - Every increment feels meaningful because reaching new highs creates permanent limitations.

**Complexity Level**: Micro Tool (single-purpose application) - This is a focused counter with a clever twist: once you reach a number, you can only count up to half of your all-time maximum.

## Essential Features

**Increment Counter (with Constraints)**
- Functionality: Increases the counter value by 1, but only up to half of the all-time maximum
- Purpose: Allows users to count up while experiencing the consequence of their previous highest value
- Trigger: Click/tap the increment (+) button
- Progression: User clicks button → System checks if increment would exceed limit → If allowed, value increases by 1 with animation → If blocked, error toast appears explaining the constraint
- Success criteria: Counter increases correctly when under limit, button disables at limit, error message displays when limit reached

**Track Maximum Reached**
- Functionality: Automatically tracks the highest value ever reached and calculates half of it as the new limit
- Purpose: Creates the core constraint mechanic that makes each new high consequential
- Trigger: Automatic when counter value exceeds previous maximum
- Progression: Counter reaches new high → Maximum value updates → Limit recalculates to half of new maximum → Limit indicator appears/updates
- Success criteria: Maximum tracks correctly, limit displays accurately, constraint is enforced

**Decrement Counter**
- Functionality: Decreases the counter value by 1 (no lower limit)
- Purpose: Allows users to count down without restrictions
- Trigger: Click/tap the decrement (-) button
- Progression: User clicks button → Value decreases by 1 → New value displays with brief animation
- Success criteria: Counter value decreases correctly and persists between sessions

**Reset Counter**
- Functionality: Returns both the counter and maximum reached to zero, removing all limits
- Purpose: Start completely fresh and restore "full power" to the counter
- Trigger: Click/tap the reset button
- Progression: User clicks reset → Counter and max both return to 0 → Limit indicator disappears → Success toast appears → Visual confirmation
- Success criteria: Counter and maximum both reset to zero, limits are removed, app returns to unlimited state

## Edge Case Handling

- **Negative Numbers**: Allow negative values - no lower limit restriction
- **Large Numbers**: Display properly formatted large numbers (with commas for readability)
- **Rapid Clicking**: Handle multiple rapid button presses smoothly, showing toast only once when hitting limit
- **Initial Load**: Start at 0 with no limits if no saved value exists
- **At Limit State**: Disable increment button and show visual warning when at the imposed limit
- **Odd Maximum Values**: When maximum is odd (e.g., 7), half rounds down (limit becomes 3)

## Design Direction

The design should evoke a sense of **tension, consequence, and strategic thinking** - like a puzzle or game where every action has weight. The interface should clearly communicate the constraint mechanic through warning colors and limit indicators, while maintaining the satisfying tactile feel of the original counter. Think digital tally counter meets resource management game.

## Color Selection

A bold, high-contrast scheme with added warning colors to communicate constraints.

- **Primary Color**: Deep Electric Blue (oklch(0.45 0.20 240)) - Communicates precision and digital accuracy, used for primary action buttons
- **Secondary Colors**: 
  - Rich Navy (oklch(0.15 0.03 240)) for depth and cards
  - Slate Gray (oklch(0.25 0.02 240)) for secondary elements
- **Accent Color**: Vibrant Cyan (oklch(0.75 0.15 200)) - Eye-catching highlight for the counter value itself and focus states
- **Destructive Color**: Warning Red (oklch(0.577 0.245 27.325)) - Used for limit warnings and error states
- **Foreground/Background Pairings**: 
  - Background (Dark Navy oklch(0.10 0.02 240)): Light Gray text (oklch(0.95 0.01 240)) - Ratio 15.2:1 ✓
  - Primary (Electric Blue oklch(0.45 0.20 240)): White text (oklch(0.98 0 0)) - Ratio 5.8:1 ✓
  - Accent (Vibrant Cyan oklch(0.75 0.15 200)): Dark Navy text (oklch(0.10 0.02 240)) - Ratio 12.1:1 ✓
  - Destructive (Warning Red oklch(0.577 0.245 27.325)): White text (oklch(0.98 0 0)) - Ratio 4.5:1 ✓

## Font Selection

Typography should feel technical yet approachable, with numeric characters that are highly legible and distinctive.

- **Typographic Hierarchy**: 
  - Counter Value: Space Grotesk Bold/96px/tight letter spacing - The hero element, large and commanding
  - Button Labels: Space Grotesk Medium/16px/normal spacing - Clear and readable
  - Secondary Text: Space Grotesk Regular/14px/relaxed spacing - Subtle guidance

## Animations

Animations should emphasize both the counting action and the constraint system - the number should briefly scale and glow when changed, buttons should have satisfying press states with subtle scale transforms, and the limit indicator should smoothly animate in when constraints activate. Error states get a shake animation. All transitions should use snappy easing (0.2s) to feel responsive. The reset action gets a more pronounced animation to signal the restoration of full functionality.

## Component Selection

- **Components**: 
  - Button (shadcn) for all interactive controls, with `size="lg"` for main increment/decrement, `variant="outline"` for reset, and `disabled` state for increment when at limit
  - Card (shadcn) as the main container for the counter interface
  - Separator (shadcn) to divide counter from controls
  - Toast (sonner) for error messages when hitting limit and success message on reset
- **Customizations**: 
  - Custom counter display component with animated number transitions using framer-motion
  - Limit indicator that appears beside the counter value showing the imposed maximum
  - Warning banner component with destructive styling that explains the constraint
  - Button hover/active states enhanced with scale transforms
  - Gradient background pattern using CSS for visual interest
- **States**: 
  - Buttons: default has subtle shadow, hover scales to 1.05 and brightens, active scales to 0.95, disabled is muted and doesn't scale
  - Counter display: pulses briefly on value change with scale animation
  - Increment button: disabled state when at limit with reduced opacity
  - Warning banner: only visible when a limit is active
- **Icon Selection**: 
  - Plus (bold weight) for increment
  - Minus (bold weight) for decrement  
  - ArrowCounterClockwise (bold weight) for reset
  - Warning (bold weight) for constraint alerts
- **Spacing**: 
  - Outer container: p-8
  - Card padding: p-12
  - Button gaps: gap-4
  - Section spacing: space-y-8
  - Warning banner: p-3 with gap-2 for icon and text
- **Mobile**: 
  - Stack buttons vertically on mobile with full-width layout
  - Reduce counter font size to 64px on small screens
  - Maintain tap-friendly 44px minimum touch targets
  - Card padding reduces to p-6 on mobile
  - Limit indicator repositions for smaller screens
