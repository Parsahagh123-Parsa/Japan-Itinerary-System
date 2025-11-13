# Design Notes

## UI/UX Principles

### Design Philosophy
- **Minimalist, Apple-inspired aesthetic**
- Clean, spacious layouts with generous white space
- Subtle shadows and rounded corners
- Smooth animations and transitions
- Mobile-first responsive design

### Color Palette
- Primary: Deep indigo/navy (#1e3a8a)
- Accent: Warm coral (#ff6b6b)
- Success: Soft green (#10b981)
- Warning: Amber (#f59e0b)
- Background: Off-white (#fafafa)
- Text: Charcoal (#1f2937)

### Typography
- Headings: System font stack (SF Pro on iOS, Segoe UI on Windows)
- Body: Inter or system sans-serif
- Japanese text: Hiragino Sans or Noto Sans JP

### Component Guidelines

#### Buttons
- Primary: Full-width on mobile, auto-width on desktop
- Rounded corners (8px)
- Clear hover states
- Loading states with spinners

#### Cards
- Subtle elevation (shadow-sm)
- Rounded corners (12px)
- Padding: 16px mobile, 24px desktop
- Hover effects for interactive cards

#### Forms
- Clear labels above inputs
- Inline validation feedback
- Error states in red
- Success states in green

## User Experience Flows

### Onboarding
1. Welcome screen with value proposition
2. Quick sign-up (email or Google)
3. First itinerary creation wizard
4. Tutorial overlay for key features

### Itinerary Creation
1. Date and city selection
2. Interest selection (tags)
3. Budget slider
4. AI generation (loading state with progress)
5. Review and edit generated itinerary
6. Save and start trip

### Daily Navigation
1. Open app → See today's schedule
2. Tap activity → View details + map
3. "Navigate" button → AR map opens
4. Real-time route guidance
5. Check-in at location
6. Next activity auto-suggests

### Re-planning
1. User taps "Adjust Plan"
2. Select reason (weather, mood, time)
3. AI suggests alternatives
4. User approves changes
5. Itinerary updates in real-time

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Font size scaling
- ARIA labels on all interactive elements

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Animation Guidelines

- Transitions: 200-300ms ease-in-out
- Page transitions: Fade + slide
- Loading states: Skeleton screens
- Success feedback: Subtle bounce animation
- Error feedback: Shake animation

## Internationalization

- English (primary)
- Japanese (secondary)
- RTL support for future languages
- Date/time formatting per locale
- Currency formatting (JPY)

