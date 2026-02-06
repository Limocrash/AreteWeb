# Component Specifications

Quick reference for component dimensions, spacing, and styling.

## Hero Section

### Plaque
- **Max Width**: 828px (desktop), 92vw (mobile)
- **Aspect Ratio**: 4:1
- **Images**:
  - Small: `hero-plaque (no text - dark vignette)-12.webp` (1200w)
  - Medium: `hero-plaque (no text - dark vignette)-1600.webp` (1600w)
  - Large: `hero-plaque (no text - dark vignette)-3200.webp` (3200w)
- **Kicker Text Overlay**: Same sizes, transparent RGBA
- **Spacing**: `mb-12 md:mb-16` (48px mobile, 64px desktop)
- **Effect**: Blue glow under edges (`from-cyan-500/40 via-blue-500/50 to-cyan-500/40`)

### Logo Banner
- **Max Width**: 1000px (desktop), 92vw (mobile)
- **Aspect Ratio**: 21:9
- **Images**:
  - Small: `logo-banner-small.webp` (400w)
  - Medium: `logo-banner-medium.webp` (800w)
  - Large: `logo-banner-large.webp` (1200w)
- **Spacing**: `mb-10 md:mb-12` (40px mobile, 48px desktop)
- **Effect**: Blue glow under edges, no dimming overlay

### Headline
- **Font**: Georgia, serif
- **Size**: `text-5xl md:text-7xl` (48px mobile, 72px desktop)
- **Weight**: Bold (700)
- **Colors**:
  - "Real Democracy.": White (dark) / Stone-900 (light)
  - "Virtue-Based. Scalable.": Gold gradient (`from-[#D4AF37] via-[#F9E076] to-[#D4AF37]`)
- **Spacing**: `mb-6` (24px)

### Subheadline
- **Font**: System-ui, sans-serif
- **Size**: `text-xl` (20px)
- **Color**: `text-gray-300` (dark) / `text-stone-700` (light)
- **Max Width**: `max-w-2xl` (672px)
- **Spacing**: `mt-4` (16px)

## AccordionTriad Section

### Container
- **Max Width**: `max-w-4xl` (896px)
- **Padding**: `px-4 sm:px-6 lg:px-8` (16px/24px/32px)
- **Vertical Spacing**: `py-16 md:py-24` (64px/96px)

### Section Header
- **Title**: "The Promise"
  - Font: Georgia, serif
  - Size: `text-3xl md:text-4xl` (30px/36px)
  - Weight: Bold (700)
  - Color: White (dark) / Stone-900 (light)
- **Description**:
  - Size: `text-lg md:text-xl` (18px/20px)
  - Color: `text-gray-300` (dark) / `text-stone-700` (light)
- **Spacing**: `mb-12` (48px)

### Accordion Item
- **Border Radius**: `rounded-lg` (8px)
- **Border**: 
  - Closed: `border-gray-700` (dark) / `border-stone-200` (light)
  - Open: `border-cyan-500/50` (dark) / `border-cyan-600/50` (light)
- **Background**:
  - Closed: `bg-gray-800/50` (dark) / `bg-white` (light)
  - Open: `bg-gray-800/80` (dark) / `bg-white` (light)
- **Shadow** (when open): `shadow-lg shadow-cyan-500/20`
- **Spacing**: `space-y-4` (16px between items)

### Accordion Headline Button
- **Padding**: `px-6 py-5 md:px-8 md:py-6` (24px/32px horizontal, 20px/24px vertical)
- **Font**: Georgia, serif
- **Size**: `text-xl md:text-2xl` (20px/24px)
- **Weight**: Bold (700)
- **Color**: `text-amber-200` (dark) / `text-stone-900` (light)
- **Chevron**: 
  - Size: 24px
  - Color: `text-cyan-400` (dark) / `text-cyan-600` (light)
  - Animation: Rotates 180° when open

### Accordion Reveal Content
- **Padding**: `px-6 py-5 md:px-8 md:py-6` (same as button)
- **Border Top**: `border-gray-700` (dark) / `border-stone-200` (light)
- **Background**: `bg-gray-800/40` (dark) / `bg-stone-50/50` (light)
- **Font**: Georgia, serif
- **Size**: `text-lg md:text-xl` (18px/20px)
- **Line Height**: `leading-relaxed` (1.75)
- **Color**: `text-gray-200` (dark) / `text-stone-700` (light)

### CTA Buttons Container
- **Layout**: `flex flex-col sm:flex-row` (stacked mobile, horizontal desktop)
- **Gap**: `gap-4` (16px)
- **Alignment**: `justify-center items-center`
- **Spacing**: `mb-12` (48px from accordion)

### Primary CTA Button ("SEE THE BLUEPRINT")
- **Width**: `w-full sm:w-auto` (full width mobile, auto desktop)
- **Padding**: `px-8 py-4` (32px horizontal, 16px vertical)
- **Background**: Gold gradient `from-[#D4AF37] to-[#B4941F]`
- **Text Color**: Black
- **Font Weight**: Bold (700)
- **Border Radius**: `rounded-sm` (2px)
- **Shadow**: `shadow-[0_0_20px_rgba(212,175,55,0.3)]`
- **Hover Shadow**: `hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]`

### Secondary CTA Button ("SUPPORT THE MISSION")
- **Width**: `w-full sm:w-auto` (full width mobile, auto desktop)
- **Padding**: `px-8 py-4` (32px horizontal, 16px vertical)
- **Border**: `border-2 border-[#D4AF37]` (2px gold)
- **Text Color**: `text-[#D4AF37]` (gold)
- **Font Weight**: Bold (700)
- **Border Radius**: `rounded-sm` (2px)
- **Hover**: `hover:bg-[#D4AF37]/10` (10% gold background)

## Bedrock Section (4 Cards)

### Container
- **Max Width**: `max-w-7xl` (1280px)
- **Padding**: `px-4 sm:px-6 lg:px-8`
- **Vertical Spacing**: `py-24` (96px)
- **Background**: `bg-gray-800/50` (dark) / `bg-stone-100` (light)

### Grid
- **Layout**: `grid grid-cols-1 md:grid-cols-2`
- **Gap**: `gap-8 lg:gap-12` (32px/48px)

### Feature Card
- **Padding**: `p-8` (32px)
- **Border Radius**: `rounded-xl` (12px)
- **Border**: `border-gray-800` (dark) / `border-stone-200` (light)
- **Background**: `bg-gray-900` (dark) / `bg-white` (light)
- **Hover**: `hover:border-[#00F0FF]/30` (dark) / `hover:border-[#D4AF37]/50` (light)
- **Shadow**: `hover:shadow-xl`

### Card Icon
- **Size**: 32px
- **Colors**: `#00F0FF` (electric blue) or `#D4AF37` (gold)
- **Container**: `p-3 rounded-lg bg-opacity-10 bg-gray-500`
- **Spacing**: `mb-6` (24px)

### Card Title
- **Font**: Georgia, serif
- **Size**: `text-xl` (20px)
- **Weight**: Bold (700)
- **Spacing**: `mb-3` (12px)
- **Hover Color**: `group-hover:text-[#D4AF37]`

### Card Description
- **Font**: System default
- **Line Height**: `leading-relaxed` (1.75)
- **Color**: `text-gray-300` (dark) / `text-stone-700` (light)

## Navigation Bar

### Container
- **Height**: `h-14 md:h-16` (56px/64px)
- **Position**: Fixed top
- **Background**: `bg-stone-900/95 backdrop-blur-sm` (dark) / `bg-stone-50/95 backdrop-blur-sm` (light)
- **Z-Index**: `z-50`

### Logo
- **Height**: `h-8 md:h-10` (32px/40px)
- **Width**: Auto
- **Responsive Images**: 120px/160px/200px breakpoints

### Nav Items
- **Gap**: `gap-1 md:gap-2` (4px/8px)
- **Padding**: `px-3 md:px-4 py-2` (12px/16px horizontal, 8px vertical)
- **Border Radius**: `rounded-lg` (8px)
- **Active Indicator**: `h-0.5` (2px) cyan bottom border with glow

## Footer

### Container
- **Padding**: `py-8` (32px vertical)
- **Border Top**: `border-t border-stone-800` (dark) / `border-stone-300` (light)
- **Background**: `bg-stone-900` (dark) / `bg-stone-50` (light)

### Content
- **Layout**: `flex flex-col md:flex-row justify-between`
- **Gap**: `gap-4` (16px)
- **Font Size**: `text-sm` (14px)
- **Text Color**: `text-stone-300` (dark) / `text-stone-700` (light)

### Legal Links
- **Gap**: `gap-4` (16px)
- **Separator**: `·` (middle dot)
- **Hover**: `hover:text-amber-200` (dark) / `hover:text-amber-700` (light)
