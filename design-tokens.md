# Design Tokens — Extracted from Mars Men (mengotomars.com/pages/t-upgrade-cortisol)

## Typography

| Level | Desktop | Mobile | Weight | Line-height | Letter-spacing | Font |
|---|---|---|---|---|---|---|
| H1 / Display | 41px | 24px | 600 | 110% | -0.02em | Monospace (Martian Mono) |
| H2 / Section | 48px | 32px | 400* | 100% | normal | Display sans (Fold-Grotesque-Black) |
| H3 / Sub | 20px | 16px | 400* | 115% | normal | Display sans |
| Body | 20px | 16px | 400 | 115% | normal | Display sans |
| Eyebrow / Label | 16px | 14px | 400 | 16px | uppercase | Mono/slab (bc-sklonar) |
| Button | 25px | 25px | 400 | normal | normal | System |

*Note: Mars Men uses "Fold-Grotesque-Black" which is inherently heavy — weight 400 in that font = ~800 in a standard sans.

## Spacing

| Property | Desktop | Tablet | Mobile |
|---|---|---|---|
| Section padding-top | 57px | 50px | 14px |
| Section padding-bottom | 88px | 50px | 0px |
| Section-to-section gap | 0px | 0px | 0px |
| Container max-width | 1200px | 1200px | 100% |
| Content padding L/R | 20px | 20px | 20px |
| Grid gutter (2-col) | 100px | 20px | 20px |

## Grid

- Primary layout: `grid-template-columns: repeat(2, minmax(0, 1fr))` — true 50/50
- Gutter: 100px desktop, 20px mobile
- Mobile: `flex-direction: column` (single column stack)

## Colors (Genius Mind mapping)

| Mars Men | Genius Mind | Usage |
|---|---|---|
| #ff5600 (orange) | #00A6D2 (teal) | CTA, accents, highlights |
| #262626 (dark bg) | #0a0e14 (dark bg) | Dark section backgrounds |
| #FFFFFF | #FFFFFF | Light section backgrounds |
| #FF0000 (red border) | #E8283B (red border) | Warning boxes |
| #f0f0f0 (card bg) | #E8F5F8 (light teal) | Feature card backgrounds |

## Breakpoints

- Mobile: max-width 640px
- Tablet: 641px — 1024px
- Desktop: 1025px+

## Image Treatment

- Border-radius: 12px
- object-fit: cover
- Common max-width: 440px
- No shadows (opacity: 0)

## Warning Boxes

- Border: 1px solid red
- Border-radius: 4px
- Padding: 9px
- Font-size: 18px (mobile: 16px)

## CTA Buttons

- Background: brand accent (teal #00A6D2)
- Text: white
- Font-size: 25px
- Border-radius: 9px
- Border: 1px solid accent
