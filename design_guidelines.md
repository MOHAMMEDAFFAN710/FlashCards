# Flashcard Study App - Design Guidelines

## Design Approach
**Reference-Based: Tinder-Inspired Card Interface**
Adapting Tinder's signature swipeable card mechanics for educational content, maintaining the playful, gesture-driven interaction model while establishing a focused, study-optimized aesthetic. Key inspiration: bold card stacks, smooth animations, and minimalist content presentation.

## Core Design Principles
- **Gesture-First Interaction**: Swipe mechanics as primary navigation
- **Content Clarity**: Distraction-free reading optimized for learning
- **Visual Momentum**: Smooth transitions that encourage flow state
- **Mobile-Optimized**: Touch-friendly with desktop support

## Color Palette

**Dark Mode (Primary)**
- Background: 220 20% 10% (deep navy-charcoal)
- Card Surface: 220 15% 18% (elevated card gray)
- Primary Accent: 260 80% 65% (vibrant purple - learning/focus)
- Success/Progress: 150 60% 55% (sage green)
- Text Primary: 220 10% 95%
- Text Secondary: 220 10% 65%

**Light Mode**
- Background: 220 15% 97%
- Card Surface: 0 0% 100%
- Primary Accent: 260 70% 60%
- Success/Progress: 150 50% 45%

## Typography
**Fonts**: Inter (primary) for clean readability, JetBrains Mono (code snippets if needed)
- Card Question/Title: text-2xl to text-3xl font-semibold
- Card Content: text-lg font-normal (optimal reading size)
- Metadata/Labels: text-sm font-medium
- Line Height: leading-relaxed (1.625) for comfortable reading

## Layout System
**Spacing Primitives**: Tailwind units 4, 6, 8, 12, 16 (p-4, gap-6, m-8, py-12, etc.)
- Card Stack Container: max-w-2xl centered, px-4 for mobile breathing room
- Card Dimensions: Full container width, min-height of 400-500px
- Z-axis Stack: Show 2-3 cards beneath with offset transforms

## Component Library

### A. Card Stack Interface
- **Current Card**: Full opacity, elevated shadow (shadow-2xl), front of stack
- **Next Cards (2-3)**: Staggered behind with scale transforms (0.95, 0.9), reduced opacity (0.7, 0.4)
- **Card Interior**: p-8 to p-12 padding, flex layout for vertical spacing
- **Corner Radius**: rounded-3xl for modern, friendly feel

### B. Swipe Mechanics
- **Visual Feedback**: Card rotates 5-10° during drag, translates with finger/cursor
- **Swipe Indicators**: Subtle left/right arrows that fade in during drag
- **Threshold**: 100-150px horizontal drag to trigger card change
- **Animations**: spring physics (duration-300 ease-out) for natural feel

### C. Navigation & Controls
- **Bottom Action Bar**: Fixed position with undo/redo buttons, deck menu
- **Progress Bar**: Thin bar (h-1) at top showing position in deck, gradient fill
- **Card Counter**: Small badge showing "12 / 45" current position
- **Deck Selector**: Dropdown or side panel for switching between study sets

### D. Flashcard Content Structure
- **Front/Back Toggle**: Tap card to flip (rotateY animation)
- **Question Side**: Larger text, centered or top-aligned, icon for card type (Q&A, definition, etc.)
- **Answer Side**: Supporting details, formatted text with syntax highlighting for code
- **Tags**: Small chips at card bottom for subject/topic categorization

### E. Deck Management Interface
- **Deck Grid**: 2-column grid (md:grid-cols-3) of deck cards
- **Deck Card**: Preview of first flashcard, deck title, card count, last studied date
- **Create Deck Button**: Prominent floating action button (bottom-right) with plus icon
- **Import Modal**: Textarea for pasting AI-generated content, parsing into flashcards

### F. Input & Upload Flow
- **Multi-Step Form**: Upload → Format → Preview → Generate
- **Text Parser UI**: Show detected flashcards with edit capabilities
- **AI Format Guide**: Helper text showing expected format from ChatGPT/Gemini
- **Batch Actions**: Select all, delete, reorder cards before finalizing

## Animations
**Use Sparingly - Only for Core Interactions**
- Card swipe/drag: Transform-based, hardware-accelerated
- Flip animation: 300ms rotateY transform
- Stack shuffle: Smooth scale/translate when cards advance
- **Avoid**: Loading spinners (use skeleton screens), decorative animations

## Images
**No Hero Image Needed** - This is a utility-focused app prioritizing functionality. If decorative elements needed:
- Abstract geometric patterns in empty states (use CSS gradients/shapes)
- Placeholder illustrations for empty deck states
- Small icons for card types and categories (use Heroicons)

## Key Interaction Patterns
- **Desktop**: Mouse drag OR arrow keys (left/right) OR button clicks
- **Mobile**: Touch swipe gestures as primary, tap to flip cards
- **Keyboard Shortcuts**: Space (flip), Arrow keys (navigate), Enter (mark complete)
- **Haptic Feedback**: Subtle vibration on mobile for card changes

## Accessibility
- Maintain WCAG AA contrast ratios on all card text
- Ensure keyboard navigation for all swipe actions
- Screen reader announces card number and content
- Reduced motion mode: Disable swipe animations, use instant transitions
- Dark mode consistency across all form inputs and modals