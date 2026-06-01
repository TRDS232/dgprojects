# Design System

## Theme
Dark — deep slate-black communicates premium authority and focus. Reference aesthetic: Linear, Vercel homepage, Stripe. The darkness is intentional, not decorative. It frames content sharply and positions the agency as serious and capable.

Scene: A business owner in a modern office searching for an agency on a laptop, mid-morning. They want to feel confident, not bedazzled. The site should project quiet authority.

## Color Strategy
**Committed** — one saturated accent carries 20-30% of key interactive surfaces. The crimson accent is distinctive, warm, and authoritative without reading as "danger."

- Background:  `#07070e` (deep indigo-black — not pure black, has character)
- Surface:     `#0c0c18` (card/panel backgrounds)
- Surface-2:   `#101024` (elevated surfaces)
- Border:      `rgba(255,255,255,0.07)` (subtle)
- Border hover:`rgba(255,255,255,0.12)`
- Text-1:      `#f0f0ec` (slightly warm white — not `#fff`)
- Text-2:      `#787890` (muted body copy)
- Text-3:      `#44445a` (labels, timestamps, secondaries)
- Accent:      `#c72a2a` (elevated crimson — brighter than previous wine-red)
- Accent hover:`#d63b3b`
- Accent dim:  `rgba(199,42,42,0.10)`

## Typography
- Display: Poppins 700, very large (hero: 64-88px, sections: 44-56px)
- Body: Open Sans 400/600, 16-18px, max-line-length 65ch
- Label: 11px, letter-spacing 0.25em, uppercase, accent color
- Numbers: Poppins 700, tabular-nums, used in process steps and plans
- No gradient text — accent words use solid `#c72a2a`

## Motion
- Entrance: `translateY(24px) opacity:0 → 0.6s cubic-bezier(0.16,1,0.3,1)` — natural, confident
- Hover scale: `translateY(-1px)` on buttons, `scale(1.01)` on cards
- No bounce, no elastic, no spring
- Process steps: staggered delay 0, 80ms, 160ms...

## Absolute rules
- No side-stripe borders on cards
- No gradient text
- No glassmorphism on cards (nav blur is acceptable and purposeful)
- No identical card grids (services use stacked rows, not 3-col card grid)
- Hero does not follow the SaaS metric template (no giant numbers with labels)

## Components
- Buttons: solid crimson primary / ghost border secondary, both 14px with 0.03em tracking
- Nav: thin blur-only glass, no opaque background, border-b on scroll
- Cards: full border (not side-stripe), dark surface fill
- Tags/chips: small, bordered, low-contrast — supporting role
- Plans: center card featured with accent border treatment
