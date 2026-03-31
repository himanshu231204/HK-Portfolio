# Animation Standards

## Overview

This document defines Framer Motion animation patterns and best practices for the portfolio.

## Core Principles

1. **Performance First**: Always use `viewport={{ once: true }}` for scroll animations
2. **Consistent Timing**: Use standard durations (0.3s, 0.6s, 0.8s)
3. **Subtle Effects**: Prefer subtle animations over dramatic ones
4. **Interaction Feedback**: Use `whileHover` and `whileTap` for interactive elements

## Standard Animations

### Scroll Entry Animation

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### Staggered Children

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Usage
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>
```

### Hover Animation

```typescript
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
```

### Scale Animation

```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

## Timing Constants

| Duration | Use Case |
|----------|----------|
| 0.3s | Quick hover effects, small elements |
| 0.6s | Standard scroll entry, section transitions |
| 0.8s | Complex animations, hero elements |
| 1.0s+ | Special effects only |

## Easing

Default easing for most animations:

```typescript
transition={{ duration: 0.6 }}
// Uses default easing: "easeOut"
```

For continuous animations:

```typescript
transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
```

## Common Patterns

### Button Animation

```typescript
<motion.a
  href="#link"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 bg-indigo-600 rounded-full"
>
  Button Text
</motion.a>
```

### Card Animation

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  whileHover={{ scale: 1.02 }}
  className="glass rounded-lg p-6"
>
```

### Icon Animation

```typescript
<motion.a
  href={url}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  <Icon size={24} />
</motion.a>
```

## Section-Specific Patterns

### Hero Section

- Initial load animation with staggered elements
- Delay sequence: 0.2s, 0.3s, 0.4s, 0.5s
- Longer durations (0.6s - 0.8s)

### Content Sections

- Scroll-triggered entry animations
- Medium delay between items (0.1s)
- Standard duration (0.6s)

### Grid Sections

- Staggered animation per grid item
- Delay based on index: `index * 0.1`
- Hover scale effect on cards

### Stats Section

- Scale-in animation
- Count-up effect (optional, using Framer Motion variants)

## Performance Tips

1. **Use `once: true`**: Prevents re-animation on scroll back
2. **Limit animated properties**: Animate `opacity` and `transform` only
3. **Use `will-change`**: For complex animations if needed
4. **Avoid animating layout**: Prefer transform over width/height

## Predefined Animations

Custom animations defined in `app/globals.css`:

```css
.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.grid-bg {
  /* Grid pattern background */
}

.radial-gradient {
  /* Radial gradient overlay */
}
```

## Testing Animations

1. Test scroll behavior: Scroll up and down
2. Test hover states: Mouse over interactive elements
3. Test mobile: Verify animations work on touch
4. Test reduced motion: Consider `prefers-reduced-motion`

## Accessibility

For accessibility, use appropriate `prefers-reduced-motion` queries in CSS or Framer Motion:

```typescript
<motion.div
  // Simplified animation for reduced motion
  // Can be handled via CSS media queries
>
```
