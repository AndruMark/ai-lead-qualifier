# Comparative Accessibility Analysis: Hand-Crafted vs. shadcn/ui (Radix UI)

## Context & Objectives
This document audits the hand-crafted interactive components built in `playground/components/` (`Modal`, `Tabs`, `Disclosure`) against their production equivalents in `shadcn/ui` (powered by `@radix-ui/react-dialog` and `@radix-ui/react-tabs`), as required by Milestone FE-05.

---

## 1. What Our Hand-Crafted Version Handled
- **Modal Dialog (`Modal.tsx`)**:
  - Semantic markup: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`.
  - Manual focus trap using standard DOM querying (`querySelectorAll`) checking for disabled states and cycling between `firstEl` and `lastEl` on `Tab` / `Shift+Tab`.
  - Focus restoration: Tracks `document.activeElement` prior to opening and returns focus to `triggerRef.current` upon teardown.
  - Dismissal listeners: Intercepts `Escape` key and handles backdrop clicks with event bubbling prevention (`stopPropagation`).

- **Tabs (`Tabs.tsx`)**:
  - Semantic layout: `role="tablist"` with `aria-orientation="horizontal"`, `role="tab"`, and `role="tabpanel"`.
  - Roving tabindex pattern: The active tab has `tabIndex={0}`; inactive tabs are removed from the sequential tab order (`tabIndex={-1}`).
  - Keyboard navigation: Full support for `ArrowRight`, `ArrowLeft`, `Home`, and `End` with circular index wrapping.

- **Disclosure (`Disclosure.tsx`)**:
  - Accessible disclosure trigger: Native `<button>` with explicit `aria-expanded` and `aria-controls` linked to generated unique IDs via `useId()`.
  - Panel visibility: Uses native `hidden` attribute to guarantee the content is completely removed from accessibility tree navigation when collapsed.

---

## 2. Concrete Gaps Identified in shadcn/ui (Radix UI Primitives)

By inspecting the source code of `@radix-ui/react-dialog` and `@radix-ui/react-tabs`, the following advanced edge cases and architectural capabilities were identified:

### Gap 1: Inactive Background Tree Inertness (`aria-hidden` / `inert` on Siblings)
- **Our Limitation**: While our `Modal.tsx` traps keyboard focus within its container using a `keydown` listener, mouse clicks, mobile assistive touches, or screen reader virtual cursors (e.g., VoiceOver, NVDA browse mode) could still inspect outside sibling nodes if `aria-hidden` is not placed on the background tree.
- **shadcn / Radix Solution**: Radix's `DialogPrimitive.Root` mounts inside a React Portal (`@radix-ui/react-portal`) and integrates `aria-hidden` libraries (`aria-hidden` / HTML `inert`). When the dialog opens, it dynamically marks every other top-level sibling in `document.body` as `aria-hidden="true"`, completely shielding the background from assistive technology until the modal unmounts.

### Gap 2: Advanced Scroll Locking & Layout Shift Prevention
- **Our Limitation**: In our implementation, opening the modal allows the underlying background page to continue scrolling underneath the backdrop on touch devices and desktop trackpads, creating a disorienting "scroll-bleed" effect.
- **shadcn / Radix Solution**: Radix leverages `react-remove-scroll` to remove the body scrollbar while calculating the exact scrollbar width and injecting compensatory padding (`padding-right`) onto the `<body>`. This prevents horizontal layout shift while completely disabling background touch-move events.

### Gap 3: Polymorphic Composition & Decoupled State via `asChild` / Context
- **Our Limitation**: Our components encapsulate both the trigger and content inside rigid wrappers. To use `Modal`, a developer must manually control an external `isOpen` state and write custom triggers.
- **shadcn / Radix Solution**: shadcn uses Radix's compound component pattern (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogClose`) powered by `Slot` (`@radix-ui/react-slot`). Through `asChild`, users can attach accessible ARIA bindings, handlers, and refs to any custom button without injecting unnecessary `div` wrappers into the DOM.

### Gap 4: Automatic vs. Manual Tab Activation & Orientation Flexibility
- **Our Limitation**: Our `Tabs` implementation only supports manual selection with horizontal orientation.
- **shadcn / Radix Solution**: Radix's `TabsPrimitive.Root` allows choosing between `activationMode="automatic"` (switching panel immediately upon arrow key focus) and `activationMode="manual"` (requiring Enter/Space to select), and seamlessly supports `orientation="vertical"` by switching keyboard bindings to `ArrowUp` and `ArrowDown`.

---

## 3. Key Takeaway
Building accessible components from scratch illustrates the nuance behind the W3C specifications—particularly focus cycling and keyboard event loops. However, production-grade accessibility libraries like Radix/shadcn solve subtle, high-impact platform edge cases: portal mounting, screen reader virtual navigation trapping, body scroll locks, and compound composition.
