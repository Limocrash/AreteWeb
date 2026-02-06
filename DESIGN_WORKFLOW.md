# Design-to-Code Workflow Guide

## Overview
This guide helps you design the Gemini Hero page in Figma/Framer and port changes back to code without breaking things.

## Recommended Tools

### Option 1: **Framer** (Recommended)
- ✅ Better React/component support
- ✅ Can export React code directly
- ✅ Better for interactive prototypes
- ✅ Easier to maintain component structure
- ⚠️ Subscription required ($20/month)

### Option 2: **Figma** (Alternative)
- ✅ Free tier available
- ✅ Industry standard
- ✅ Great collaboration features
- ⚠️ Code export requires plugins (Anima, Figma to React, etc.)
- ⚠️ Export often needs cleanup

### Option 3: **Penpot** (Open Source Alternative)
- ✅ Free and open source
- ✅ Similar to Figma
- ⚠️ Less mature ecosystem

## Step 1: Import Design Tokens

### For Figma:
1. Install **"Figma Tokens"** plugin (by Jan Six)
2. Go to Plugins → Figma Tokens → Import
3. Select `design-tokens.json`
4. Tokens will appear in your design system

### For Framer:
1. Open your project
2. Go to Design → Tokens
3. Import `design-tokens.json` or manually create tokens from the file
4. Use tokens for colors, spacing, typography

## Step 2: Component Structure Reference

### Current Hero Section Structure:
```
Hero Section (header)
├── Plaque (4:1 aspect, max 828px)
│   ├── Background image (marble)
│   └── Kicker text overlay (transparent)
├── Logo Banner (21:9 aspect, max 1000px)
├── Headline (h1)
│   ├── "Real Democracy."
│   └── "Virtue-Based. Scalable." (gold gradient)
└── Subheadline (p)

AccordionTriad Section
├── Section Header
│   ├── "The Promise" (h2)
│   └── Description (p)
├── Accordion Items (3)
│   ├── Headline (h3) + Chevron
│   └── Reveal Content (p)
└── CTA Buttons
    ├── "SEE THE BLUEPRINT" (filled gold)
    └── "SUPPORT THE MISSION" (outlined gold)

Bedrock Section (4 cards grid)
Isótēs Section (4 cards grid)
Tetradrachma Flip Section
Final CTA Section
```

## Step 3: Design Guidelines

### Colors
- **Primary Gold**: `#D4AF37` - Use for CTAs, highlights
- **Electric Blue**: `#00F0FF` - Use for icons, accents, glows
- **Dark Background**: `#111827` (gray-900) or `#0C0A09` (stone-900)
- **Light Background**: `#FAFAF9` (stone-50)

### Typography
- **Headings**: Georgia, serif
- **Body**: Georgia, serif (or system-ui fallback)
- **Sizes**: Use tokens from `design-tokens.json`

### Spacing
- Use 4px base unit (0.25rem = 4px)
- Common spacing: 16px, 24px, 32px, 48px, 64px
- Reference `spacing` section in tokens

### Shadows & Effects
- **Gold Glow**: `0 0 20px rgba(212, 175, 55, 0.3)`
- **Cyan Glow**: `0 0 10px rgba(34, 211, 238, 0.6)`
- **Blue Glow (under edges)**: Gradient blur effect

## Step 4: Exporting from Design Tool

### From Framer:
1. Select component/frame
2. Right-click → "Copy as React"
3. Paste into a new file for review
4. Extract design decisions (spacing, colors, sizes)
5. Apply to existing components

### From Figma:
1. Use **Anima** plugin (best for React):
   - Select frame
   - Anima → Export → React
   - Review generated code
   - Extract design tokens/values

2. Or use **Figma to React** plugin:
   - Similar workflow
   - May need more cleanup

3. **Manual Approach** (most reliable):
   - Screenshot/export design
   - Note exact measurements, colors, spacing
   - Apply manually to code

## Step 5: Porting Changes Back

### Safe Workflow:
1. **Create a new branch**: `git checkout -b design-updates`
2. **Document changes**: Note what you changed (spacing, colors, layout)
3. **Update one component at a time**: Start with smallest changes
4. **Test incrementally**: Check after each change
5. **Use design tokens**: Replace hardcoded values with tokens

### What to Extract from Design:
- **Exact pixel values** for spacing, sizes
- **Color hex codes** (verify against tokens)
- **Font sizes and weights**
- **Border radius values**
- **Shadow/blur values**
- **Breakpoints** (mobile/desktop differences)

### Example: Updating AccordionTriad Spacing
```tsx
// Before (from design tool export)
<div style={{ padding: "24px 32px" }}>

// After (using Tailwind classes)
<div className="px-8 py-6">  // 32px horizontal, 24px vertical
```

## Step 6: Component Files to Update

When porting design changes, these are the main files:

1. **`src/GeminiHero.tsx`** - Main hero section
2. **`src/components/AccordionTriad.tsx`** - Feature triad
3. **`src/components/Navigation.tsx`** - Nav bar (if changed)
4. **`src/index.css`** - Global styles (if needed)

## Step 7: Testing Checklist

After porting changes:
- [ ] Test on mobile (375px, 414px widths)
- [ ] Test on tablet (768px, 1024px widths)
- [ ] Test on desktop (1280px+ widths)
- [ ] Test dark mode
- [ ] Test light mode
- [ ] Check all interactive elements (accordion, buttons)
- [ ] Verify images load correctly
- [ ] Check typography readability
- [ ] Verify spacing looks correct

## Tips for Smooth Porting

1. **Use Auto Layout in Figma/Framer**: Makes spacing more predictable
2. **Name layers clearly**: "Hero Plaque", "CTA Button Primary", etc.
3. **Use components in design tool**: Mirrors React component structure
4. **Export assets separately**: Images, icons as separate files
5. **Document decisions**: Why you changed something
6. **Start small**: Change one section at a time
7. **Keep tokens updated**: If you add new colors/spacing, update `design-tokens.json`

## Common Issues & Solutions

### Issue: "Colors don't match"
- **Solution**: Verify hex codes against `design-tokens.json`
- Check for opacity/alpha values in design tool

### Issue: "Spacing is off"
- **Solution**: Convert pixels to rem (divide by 16) or use Tailwind spacing scale
- Check for padding vs margin differences

### Issue: "Typography looks different"
- **Solution**: Verify font family (Georgia, serif)
- Check font-weight values (400, 600, 700)
- Verify line-height values

### Issue: "Shadows/glows don't match"
- **Solution**: Extract exact blur, spread, color, opacity values
- May need to use inline styles for complex shadows

## Quick Reference: Tailwind to Design Tool

| Tailwind Class | Pixel Value | Design Tool Value |
|---------------|-------------|-------------------|
| `p-4` | 16px | 16px |
| `p-6` | 24px | 24px |
| `p-8` | 32px | 32px |
| `text-xl` | 20px | 20px |
| `text-2xl` | 24px | 24px |
| `text-3xl` | 30px | 30px |
| `text-4xl` | 36px | 36px |
| `text-5xl` | 48px | 48px |
| `rounded-lg` | 8px | 8px |
| `rounded-xl` | 12px | 12px |
| `rounded-2xl` | 16px | 16px |

## Need Help?

If you get stuck porting a design:
1. Share a screenshot of the design
2. Note what you're trying to achieve
3. I can help translate design specs to code
4. We can update components together
