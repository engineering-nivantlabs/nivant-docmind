# Chat With Your Documents — Global Design Document

## Overview
A clean, productivity-oriented web application that lets users upload PDFs or paste URLs and then chat with AI to extract answers, summarize, and analyze documents. The design prioritizes focus, readability, and a ChatGPT-style conversational experience.

---

## Color Palette

### Primary Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#10B981` | Primary accent, CTAs, active states, links |
| `--primary-dark` | `#059669` | Hover states for primary elements |
| `--primary-light` | `#D1FAE5` | Light backgrounds, badges, highlights |
| `--primary-50` | `#ECFDF5` | Subtle green tint backgrounds |

### Neutral Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#FFFFFF` | Page backgrounds |
| `--surface` | `#F9FAFB` | Card backgrounds, sidebar, elevated surfaces |
| `--surface-hover` | `#F3F4F6` | Hover states on surfaces |
| `--border` | `#E5E7EB` | Borders, dividers |
| `--border-light` | `#F3F4F6` | Subtle separators |
| `--text-primary` | `#111827` | Headlines, primary text |
| `--text-secondary` | `#4B5563` | Body text, descriptions |
| `--text-muted` | `#9CA3AF` | Placeholder text, captions |
| `--text-inverse` | `#FFFFFF` | Text on dark/colored backgrounds |

### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--success` | `#10B981` | Success states, processing complete |
| `--warning` | `#F59E0B` | Warnings, processing states |
| `--error` | `#EF4444` | Errors, destructive actions |
| `--info` | `#3B82F6` | Information badges |

### Dark Mode Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--dark-bg` | `#0F172A` | Dark mode page background |
| `--dark-surface` | `#1E293B` | Dark mode cards, sidebar |
| `--dark-surface-hover` | `#334155` | Dark mode hover states |
| `--dark-border` | `#374151` | Dark mode borders |
| `--dark-text` | `#F9FAFB` | Dark mode primary text |
| `--dark-text-secondary` | `#94A3B8` | Dark mode secondary text |

---

## Typography

### Font Stack
- **Primary**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Mono**: `"JetBrains Mono", "Fira Code", monospace` (for code blocks, file names)

### Type Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| H1 (Hero) | 48px / 3rem | 700 | 1.1 | -0.02em |
| H2 (Section) | 36px / 2.25rem | 700 | 1.2 | -0.01em |
| H3 (Card Title) | 24px / 1.5rem | 600 | 1.3 | 0 |
| H4 (Subsection) | 20px / 1.25rem | 600 | 1.4 | 0 |
| H5 (Label) | 16px / 1rem | 600 | 1.4 | 0 |
| Body Large | 18px / 1.125rem | 400 | 1.6 | 0 |
| Body | 16px / 1rem | 400 | 1.6 | 0 |
| Body Small | 14px / 0.875rem | 400 | 1.5 | 0 |
| Caption | 12px / 0.75rem | 500 | 1.4 | 0.01em |

---

## Spacing Scale

Base unit: 4px
| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight gaps, icon padding |
| `space-2` | 8px | Small gaps, inline spacing |
| `space-3` | 12px | Button padding-y |
| `space-4` | 16px | Card padding, section gaps |
| `space-5` | 20px | Medium gaps |
| `space-6` | 24px | Section internal padding |
| `space-8` | 32px | Large gaps, section padding |
| `space-10` | 40px | Section vertical padding |
| `space-12` | 48px | Large section padding |
| `space-16` | 64px | Section vertical padding |
| `space-20` | 80px | Major section separation |

---

## Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 6px | Small buttons, inputs |
| `radius-md` | 8px | Cards, panels |
| `radius-lg` | 12px | Large cards, modals |
| `radius-xl` | 16px | Feature cards, hero elements |
| `radius-2xl` | 20px | Large containers |
| `radius-full` | 9999px | Pills, avatars, badges |

---

## Shadows
| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` | Subtle elevation, inputs |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Cards, dropdowns |
| `shadow-lg` | `0 12px 40px rgba(0,0,0,0.12)` | Modals, popovers |
| `shadow-xl` | `0 24px 60px rgba(0,0,0,0.16)` | Hero elements, feature demos |
| `shadow-green` | `0 4px 20px rgba(16,185,129,0.25)` | Primary CTA glow |
| `shadow-inner` | `inset 0 2px 4px rgba(0,0,0,0.04)` | Pressed states |

---

## Animation Style

### Global Animations
| Animation | Duration | Easing | Description |
|-----------|----------|--------|-------------|
| `fade-in` | 400ms | `ease-out` | Opacity 0 → 1 |
| `slide-up` | 500ms | `cubic-bezier(0.16, 1, 0.3, 1)` | translateY(20px) → 0, opacity 0 → 1 |
| `slide-down` | 400ms | `ease-out` | translateY(-10px) → 0, opacity 0 → 1 |
| `scale-in` | 300ms | `ease-out` | scale(0.95) → 1, opacity 0 → 1 |
| `slide-in-right` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | translateX(20px) → 0, opacity 0 → 1 |
| `slide-in-left` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | translateX(-20px) → 0, opacity 0 → 1 |
| `message-appear` | 350ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | scale(0.95) → 1, opacity 0 → 1, slight bounce |

### Stagger Patterns
- Feature cards: 100ms delay between each
- Chat messages: 50ms delay between each
- Document list items: 80ms delay between each
- Testimonial cards: 120ms delay between each

### Transitions
- All hover states: `transition: all 200ms ease`
- Color changes: `transition: color 150ms ease, background-color 150ms ease`
- Transform changes: `transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1)`

### Page Transitions (Framer Motion)
```tsx
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -12 }}
transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
```

---

## Scroll Behavior
- Smooth scrolling enabled globally (`scroll-behavior: smooth`)
- Landing page sections scroll naturally with `scroll-margin-top: 80px` for anchor links
- Dashboard uses overflow-auto containers, not page scroll

---

## Shared Components

### 1. Navbar
- **Landing**: Fixed top, transparent → white on scroll (backdrop blur when scrolled)
- **App**: Fixed top, white background, `h-16`, `shadow-sm`, `z-50`
- Logo: "DocuChat" with green document icon (left)
- Links: Home, Features, Pricing (landing) | Dashboard, Documents, Upload, Settings (app)
- CTA: "Get Started" (landing) or User Avatar (app)
- Mobile: Hamburger menu → slide-in drawer

### 2. Footer
- Background: `--text-primary` (#111827)
- Text: `--text-inverse` (white)
- 4-column layout: Brand, Product, Resources, Legal
- Bottom bar: Copyright, social icons
- Height: auto (padding 64px top, 32px bottom)

### 3. Button Variants
| Variant | Background | Text | Border | Hover | Shadow |
|---------|-----------|------|--------|-------|--------|
| Primary | `--primary` | White | none | `--primary-dark` | `shadow-green` |
| Secondary | `--surface` | `--text-primary` | `--border` | `--surface-hover` | `shadow-sm` |
| Ghost | transparent | `--text-secondary` | none | `--surface` | none |
| Outline | transparent | `--primary` | `--primary` | `--primary-50` | none |
| Danger | transparent | `--error` | `--error` | `red-50` | none |
| Link | transparent | `--primary` | none | underline | none |

### 4. Input Fields
- Border: `1px solid --border`
- Border-radius: `radius-md`
- Padding: 12px 16px
- Focus: `border-primary`, `ring-2 ring-primary/20`
- Placeholder: `--text-muted`
- Background: white (light), `--dark-surface` (dark)

### 5. Card Component
- Background: `--background`
- Border: `1px solid --border`
- Border-radius: `radius-lg`
- Shadow: `shadow-md`
- Padding: 24px
- Hover: `shadow-lg`, `translateY(-2px)` for interactive cards

### 6. Badge Component
- Padding: 4px 12px
- Border-radius: `radius-full`
- Font: Caption size, weight 500
- Variants: Primary (green), Secondary (gray), Outline (border only)

### 7. Chat Bubble
- **User**: Right-aligned, `--primary` background, white text, rounded-tl-xl rounded-tr-xl rounded-bl-xl
- **AI**: Left-aligned, `--surface` background, `--text-primary` text, rounded-tl-xl rounded-tr-xl rounded-br-xl
- Max width: 80%
- Padding: 16px 20px
- Shadow: `shadow-sm`
- Font: Body (16px)

### 8. Sidebar (Dashboard)
- Width: 280px (desktop), full (mobile)
- Background: `--surface`
- Border-right: `1px solid --border`
- Sections: Logo, New Chat button, Document list, User profile
- Active item: `--primary-50` background, `--primary` text, `--primary` left border

### 9. Toast / Notification
- Position: Bottom-right
- Background: `--background`
- Border: `1px solid --border`
- Border-radius: `radius-lg`
- Shadow: `shadow-lg`
- Padding: 16px
- Slide-up animation on enter

### 10. Modal / Dialog
- Overlay: `rgba(0,0,0,0.5)` with backdrop-blur
- Content: white bg, `radius-xl`, `shadow-xl`
- Max-width: 480px (default), 640px (large)
- Scale-in animation

### 11. Dropdown Menu
- Background: `--background`
- Border: `1px solid --border`
- Border-radius: `radius-md`
- Shadow: `shadow-lg`
- Items: padding 8px 12px, hover `--surface`
- Separator: `1px solid --border-light`

### 12. Tabs
- Tab list: border-bottom `1px solid --border`
- Active tab: `--primary` text, `2px` bottom border `--primary`
- Inactive: `--text-secondary`, hover `--text-primary`
- Font: Body Small, weight 500

### 13. Progress Bar / Loading
- Height: 4px (thin), 8px (default)
- Background: `--border`
- Fill: `--primary`
- Border-radius: `radius-full`
- Animated: shimmer effect for indeterminate

### 14. File Upload Dropzone
- Border: `2px dashed --border`
- Border-radius: `radius-xl`
- Background: `--surface`
- Hover/Drag-over: `--primary-50` bg, `--primary` border
- Icon: Upload icon in `--text-muted`
- Text: "Drop files here or click to browse"

---

## Page List

| Route | File | Description |
|-------|------|-------------|
| `/` | `home.md` | Landing page — hero, features, demo, pricing, testimonials |
| `/dashboard` | `dashboard.md` | Main chat interface — sidebar, chat area, document viewer |
| `/upload` | `upload.md` | Document upload — drag & drop, URL input, processing status |
| `/documents` | `documents.md` | Document management — table/grid, search, filter, actions |
| `/settings` | `settings.md` | User settings — account, API keys, theme, usage stats |

---

## Component Architecture

### App Shell (`App.tsx`)
```
<HashRouter>
  <ThemeProvider>
    <Routes>
      <Route path="/" element={<LandingLayout />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  </ThemeProvider>
</HashRouter>
```

### LandingLayout
- Navbar (landing variant)
- Main content (scrollable)
- Footer

### AppLayout
- Navbar (app variant)
- Page content (no footer)

### State Management
- React Context for: Theme, Auth/User state, Document list
- Local state for: Chat messages, UI toggles, form inputs

---

## Dark Mode Implementation
- Toggle in settings + keyboard shortcut (Ctrl/Cmd+Shift+L)
- CSS class on `<html>`: `.dark`
- Tailwind `dark:` variants
- Transition: 200ms ease on background-color, color, border-color
- Store preference in localStorage

---

## Responsive Breakpoints
| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, stacked layout, hamburger nav |
| Tablet | 640-1024px | 2-column grids, condensed sidebar |
| Desktop | > 1024px | Full layout, 3-panel dashboard |
| Wide | > 1280px | Max-width containers centered |

---

## Iconography
- Library: `lucide-react`
- Size: 20px default, 16px small, 24px large
- Stroke width: 1.5 (default), 2 (emphasis)
- Color: `--text-secondary` (default), `--primary` (active), `--text-muted` (decorative)

---

## Dependencies

### Core
- `react`, `react-dom`, `react-router-dom`
- `typescript`, `vite`
- `tailwindcss`, `postcss`, `autoprefixer`

### UI & Animation
- `framer-motion` (page transitions, micro-interactions, chat animations)
- `lucide-react` (icons)
- `clsx` + `tailwind-merge` (class utilities)
- `class-variance-authority` (component variants)

### Charts (Settings page)
- `recharts` (usage statistics charts)

### State
- React Context + hooks (no external state library needed for mock data)

### Dev
- `@types/react`, `@types/react-dom`
- `eslint`, `@typescript-eslint`

---

## Assets

| Filename | Description | Location | Type |
|----------|-------------|----------|------|
| `hero-illustration.svg` | Abstract illustration of documents flowing into chat bubbles, green/teal gradient accents, modern flat style, showing PDF pages transforming into conversation | Landing Hero | SVG |
| `feature-upload.svg` | Upload icon illustration — document with upward arrow, green accent | Landing Features | SVG |
| `feature-chat.svg` | Chat interface illustration — two speech bubbles with document lines, green accent | Landing Features | SVG |
| `feature-analyze.svg` | Analytics illustration — document with magnifying glass and chart elements, green accent | Landing Features | SVG |
| `feature-security.svg` | Security illustration — shield with lock and document, green accent | Landing Features | SVG |
| `demo-chat.png` | Screenshot/mock of the chat interface showing a document Q&A conversation, clean UI with green accents | Landing Demo | PNG |
| `avatar-1.jpg` | Professional headshot — young woman with dark hair, neutral background | Landing Testimonials | Image |
| `avatar-2.jpg` | Professional headshot — middle-aged man with glasses, neutral background | Landing Testimonials | Image |
| `avatar-3.jpg` | Professional headshot — young man with beard, neutral background | Landing Testimonials | Image |
| `avatar-4.jpg` | Professional headshot — woman with curly hair, neutral background | Landing Testimonials | Image |

---

## File Structure

```
/mnt/agents/output/chat-with-doc/
├── design/
│   ├── design.md         # This file
│   ├── home.md           # Landing page design
│   ├── dashboard.md      # Dashboard page design
│   ├── upload.md         # Upload page design
│   ├── documents.md      # Documents page design
│   └── settings.md       # Settings page design
├── public/
│   ├── images/           # Generated assets
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── AppLayout.tsx
│   │   │   └── LandingLayout.tsx
│   │   ├── chat/
│   │   │   ├── ChatBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── DocumentViewer.tsx
│   │   │   └── ChatSidebar.tsx
│   │   ├── documents/
│   │   │   ├── DocumentCard.tsx
│   │   │   ├── DocumentTable.tsx
│   │   │   ├── DocumentGrid.tsx
│   │   │   └── UploadDropzone.tsx
│   │   └── shared/
│   │       ├── Logo.tsx
│   │       ├── ThemeToggle.tsx
│   │       ├── UserAvatar.tsx
│   │       └── PageHeader.tsx
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── DocumentContext.tsx
│   ├── data/
│   │   └── mockData.ts   # All mock data
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Upload.tsx
│   │   ├── Documents.tsx
│   │   └── Settings.tsx
│   ├── sections/
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Demo.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── Testimonials.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── postcss.config.js
```

---

## Key Design Principles

1. **Focus on the conversation** — The chat interface is the star. Clean, distraction-free, with clear visual hierarchy between user and AI messages.

2. **Green means go** — The emerald green accent color signals action, progress, and AI activity. Used sparingly for maximum impact.

3. **Document context is always visible** — Whether in a side panel or referenced inline, users always know which document they're discussing.

4. **Progressive disclosure** — The landing page tells a story; the app reveals complexity gradually. No overwhelming forms or options.

5. **Consistent patterns** — Same chat bubble styles, same card components, same animation language across all pages.

6. **Light and breathable** — Generous whitespace, subtle borders, light shadows. The app should feel airy and uncluttered.
