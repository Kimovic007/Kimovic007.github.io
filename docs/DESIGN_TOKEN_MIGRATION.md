# Design Token Migration Reference

## "Quiet Luxury" Visual Identity Migration

**Migration Date**: January 29, 2026  
**Design Philosophy**: Editorial magazine aesthetic with warm neutrals, deep forest green anchor, and champagne accents.

---

## Color Token Mapping

### Old → New Color Tokens

| Old Token | Old Value | New Token | New Value | Usage |
|-----------|-----------|-----------|-----------|-------|
| `--color-primary` | `#2563eb` (Blue) | `--color-forest-green` | `#1B3B36` | Headings, footers, primary buttons, text overlays |
| `--color-primary-dark` | `#1d4ed8` (Dark Blue) | `--color-forest-green-dark` | `#142d29` | Hover states, active states |
| `--color-secondary` | `#059669` (Emerald) | `--color-champagne` | `#D4AF37` | Thin borders, icon strokes, bullet points, hover accents |
| `--color-accent` | `#f59e0b` (Amber) | `--color-champagne-muted` | `#C5A059` | Secondary accent, subtle highlights |
| `--color-pet-orange` | `#ea580c` (Orange) | *(removed)* | — | — |
| `--color-pet-teal` | `#0d9488` (Teal) | *(removed)* | — | — |
| *(new)* | — | `--color-alabaster` | `#F2F0EB` | Page backgrounds, warm off-white |
| *(new)* | — | `--color-warm-taupe` | `#A89F91` | Dividers, borders, sub-text |
| *(new)* | — | `--color-slate-grey` | `#4A4A4A` | Body text (softer than pure black) |

### Neutral Grays Replacement

| Old Tailwind Usage | New Token/Usage |
|--------------------|-----------------|
| `text-gray-900` | `--color-forest-green` (headings) |
| `text-gray-800` | `--color-slate-grey` (body text) |
| `text-gray-700` | `--color-slate-grey` (body text) |
| `text-gray-600` | `--color-warm-taupe` (secondary text) |
| `text-gray-500` | `--color-warm-taupe` (muted text) |
| `bg-gray-100` | `--color-alabaster` (backgrounds) |
| `bg-gray-50` | `--color-alabaster` (backgrounds) |
| `border-gray-200` | `--color-warm-taupe` (borders) |

---

## Typography Token Mapping

### Old → New Font Tokens

| Old Token | Old Value | New Token | New Value |
|-----------|-----------|-----------|-----------|
| `--font-heading` | `'Poppins'` | `--font-heading` | `'Playfair Display'` |
| `--font-sans` | `'Inter'` | `--font-sans` | `'Montserrat'` |

### Typography Hierarchy (Editorial Style)

| Element | Font Family | Weight | Letter Spacing | Notes |
|---------|-------------|--------|----------------|-------|
| H1 | Playfair Display | 700 | 0.02em | Large, editorial, generous whitespace after |
| H2 | Playfair Display | 600 | 0.01em | Section headers |
| H3–H6 | Playfair Display | 600 | normal | Subheadings |
| Body | Montserrat | 400 | normal | Slate Grey color |
| Nav/Buttons | Montserrat | 500–600 | normal | Clean, modern |
| Captions | Montserrat | 500 | 0.15em | ALL-CAPS with wide tracking |

---

## Component Class Migration

### Button Classes

| Class | Old Style | New Style |
|-------|-----------|-----------|
| `.btn-primary` | Blue (#2563eb), white text | Forest Green (#1B3B36), white text |
| `.btn-secondary` | Emerald (#059669), white text | Forest Green outline, champagne hover |
| `.btn-affiliate` | Amber (#f59e0b), dark text | Champagne (#D4AF37), forest green text |

### Card & Container Classes

| Class | Old Style | New Style |
|-------|-----------|-----------|
| `.card` | White bg, gray shadow | Alabaster bg, warm taupe shadow |
| `.prose-blog a` | Blue links | Forest Green links with champagne hover underline |
| `.prose-blog blockquote` | Blue left border | Champagne left border |

---

## Tailwind Utility Replacements

### Color Utilities (Inline @apply)

```css
/* OLD → NEW mappings for component files */
bg-blue-600      → bg-[var(--color-forest-green)]
bg-blue-700      → bg-[var(--color-forest-green-dark)]
bg-emerald-600   → bg-[var(--color-champagne)]
bg-amber-500     → bg-[var(--color-champagne)]
bg-amber-400     → bg-[var(--color-champagne-muted)]
text-blue-600    → text-[var(--color-forest-green)]
text-amber-500   → text-[var(--color-champagne)]
border-blue-500  → border-[var(--color-forest-green)]
border-gray-200  → border-[var(--color-warm-taupe)]
```

### Background Utilities

```css
bg-white         → bg-[var(--color-alabaster)] (for sections)
bg-gray-50       → bg-[var(--color-alabaster)]
bg-gray-100      → bg-[var(--color-alabaster)]
```

---

## Files Modified

### Core Styling
- `src/styles/global.css` — All color tokens, typography, component classes

### Component Audit
- All files in `src/components/` — Tailwind utility color replacements
- All files in `src/pages/` — Tailwind utility color replacements
- All files in `src/layouts/` — Tailwind utility color replacements

### Documentation
- `.github/copilot-instructions.md` — Updated design token references

---

## Validation Checklist

- [ ] All old color tokens removed from global.css
- [ ] Google Fonts imported (Playfair Display, Montserrat)
- [ ] All button classes updated
- [ ] All prose/typography classes updated
- [ ] Components audited for hardcoded colors
- [ ] Build passes without errors
- [ ] Visual inspection at all breakpoints

---

## Rollback Instructions

If needed, restore the original design by reverting:
1. `src/styles/global.css` to previous commit
2. All component files with color changes
3. `.github/copilot-instructions.md`

---

**Status**: Migration In Progress  
**Last Updated**: January 29, 2026
