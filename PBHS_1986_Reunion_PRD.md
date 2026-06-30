# Product Requirements Document
## Pine Bluff High School — Class of 1986
## 40-Year Class Reunion Website

---

## 1. Project Overview

**Project Name:** PBHS Class of 1986 — 40-Year Reunion Website
**School:** Pine Bluff High School, Pine Bluff, Arkansas
**Class:** Class of 1986
**Reunion Year:** 2026 (40-Year Reunion)
**Tagline:** *Celebrating 40 Years of Friendship, Legacy, and Zebra Pride*
**Mascot:** The Zebras

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | ReactJS (functional components + hooks) |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Icons | Lucide React |
| Fonts | Google Fonts (display + body pairing — see Design System) |
| Deployment | Netlify or Vercel (static export) |

---

## 3. Goals & Purpose

- Serve as the central digital hub for all Class of 1986 reunion communications
- Drive registrations via an embedded Google Form link
- Inform classmates of all weekend events, locations, times, and attire
- Capture donations, sponsorship contributions, and T-shirt orders
- Foster excitement and nostalgia leading up to reunion weekend
- Connect classmates via Facebook community page

---

## 4. Target Audience

- PBHS Class of 1986 graduates (~50–65 years old)
- Guests and family members accompanying classmates
- Reunion planning committee

---

## 5. Site Architecture / Pages

```
/               → Home Page
/events         → Weekend Events Page
/register       → Registration Page
```

A persistent **Navbar** and **Footer** appear on all pages.

---

## 6. Design System

### 6.1 Color Palette

Pine Bluff High School's colors are **Black, White, and Red**. The palette should honor these while creating an elevated, celebratory 40-year reunion aesthetic.

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1A1A1A` (near-black) | Headings, navbar |
| `--color-accent` | `#C8102E` (PBHS Red) | CTAs, highlights, accents |
| `--color-gold` | `#D4AF37` (anniversary gold) | 40-year milestone callouts |
| `--color-white` | `#FAFAFA` | Backgrounds, card surfaces |
| `--color-muted` | `#6B7280` | Body text, secondary labels |
| `--color-surface` | `#F4F4F5` | Section backgrounds |

> The gold accent (`#D4AF37`) distinguishes the **40th anniversary** milestone and should appear in headings, timeline markers, and decorative dividers.

### 6.2 Typography

| Role | Font | Weight |
|---|---|---|
| Display / Hero | `Playfair Display` | 700, 900 |
| Section Headings | `Cormorant Garamond` | 600 |
| Body / UI | `DM Sans` | 400, 500 |
| Accent / Labels | `DM Sans` | 600, uppercase tracking |

### 6.3 Visual Style

- **Aesthetic Direction:** Refined elegance meets school spirit — think a *reunion gala program* brought to life digitally. Classic, warm, and celebratory without feeling corporate.
- **Decorative Elements:** Thin gold horizontal rules, zebra stripe texture accents (subtle CSS stripes), red ribbon/badge components for event cards.
- **Imagery Placeholders:** Hero section should include a placeholder banner image area (e.g., school silhouette or zebra graphic) with fallback gradient.
- **Animations:** Subtle fade-in-up on page section mount, staggered event card reveals, smooth page transitions via React Router.
- **Buttons:** Solid red (`bg-red-700`) for primary CTAs; black outline for secondary.

---

## 7. Page Specifications

---

### 7.1 Shared Components

#### Navbar
- Fixed top, full-width
- Left: School name / logo text — "PBHS '86"
- Right: Navigation links — `Home` | `Events` | `Register`
- Mobile: Hamburger menu (collapsible drawer)
- Active link underlined in red/gold
- Background: white with subtle bottom border; scrolled state adds drop shadow

#### Footer
- Background: near-black (`#1A1A1A`)
- Left col: School name, tagline, class year
- Center col: Quick links (Home, Events, Register)
- Right col: Social link — Facebook icon + "Join our Facebook Group" (links to `https://www.facebook.com/share/p/1Csh6ANkvr/`)
- Bottom strip: "© 2026 PBHS Class of 1986 Reunion Committee · Pine Bluff, Arkansas"

---

### 7.2 Home Page (`/`)

#### Section 1 — Hero Banner
- **Headline (H1):** "Welcome, Mighty Zebras!"
- **Subheadline:** "Celebrating 40 Years of Friendship, Legacy, and Zebra Pride"
- **Body copy:** "We are excited to celebrate 40 years with the Pine Bluff High School Class of 1986."
- **CTA Buttons:**
  - Primary: "Register Now" → links to `/register`
  - Secondary: "View Weekend Events" → links to `/events`
- **Visual:** Full-width hero section with gradient overlay (black to transparent) over a subtle zebra stripe or school-colored background. Gold "40" or "Class of 1986" badge element overlaid.
- **Countdown Timer Component:** Live countdown to October 30, 2026 (Friday kickoff). Display: Days · Hours · Minutes · Seconds. Style: gold numbers on dark background tile.

#### Section 2 — "What to Expect" / Registration Intro
- **Heading:** "Complete Your Registration"
- **Body:** "Please complete the registration form to:"
- **Bulleted checklist items (styled with checkmark icons in red/gold):**
  - Register for reunion events
  - Order reunion T-shirts
  - Make donations or sponsorship contributions
  - Help us prepare for an unforgettable reunion weekend
- **CTA:** "Go to Registration Form" → `/register`

#### Section 3 — Weekend Snapshot (Preview Cards)
- 3-column responsive grid (stacks to 1 col on mobile)
- Three cards representing Friday, Saturday, Sunday — each with:
  - Day label (bold, red)
  - Short teaser copy
  - "See Full Schedule" link → `/events`

#### Section 4 — Facebook Community Banner
- Full-width band in PBHS Red
- Text: "Stay connected with your classmates!"
- Facebook icon + button: "Join Our Facebook Group" → `https://www.facebook.com/share/p/1Csh6ANkvr/`

---

### 7.3 Weekend Events Page (`/events`)

#### Page Header
- **H1:** "Reunion Weekend Events"
- **Subtext:** "October 30 – November 1, 2026 · Pine Bluff, Arkansas"
- Decorative gold divider rule beneath heading

#### Layout: Vertical Timeline or Tabbed Day View

Implement a **tabbed navigation** (Friday / Saturday / Sunday tabs) OR a vertical timeline layout. Tabs preferred for mobile usability.

---

#### Friday, October 30, 2026

**Event 1: Meet & Greet**
| Field | Detail |
|---|---|
| Title | Meet & Greet |
| Date | Friday, October 30, 2026 |
| Location | PBHS Student Union / Cafeteria |
| Time | 5:30 PM – 6:30 PM |
| Attire | Reunion T-Shirt |
| Description | Kick off reunion weekend reconnecting with classmates, sharing memories, and enjoying an evening of fellowship and fun. |

**Event 2: Football Game & Zebra Spirit**
| Field | Detail |
|---|---|
| Title | Friday Night Lights — Football Game & Zebra Spirit |
| Location | Pine Bluff High School Football Field |
| Kickoff | 7:00 PM |
| Attire | Show your Zebra Pride! |
| Description | Nothing says reunion weekend like Friday night lights and Zebra pride! We'll head to the football game after the Meet and Greet. Come enjoy the game, celebrate with classmates, and help bring the energy as we cheer those Fighting Zebras to victory. |
| ⚠️ Note | Football game tickets are **not** included with reunion registration and must be purchased individually. |

> The ticket disclaimer should be styled as a **callout/alert box** (amber/gold background, warning icon).

---

#### Saturday, October 31, 2026

**Event 3: Day Party Brunch Celebration**
| Field | Detail |
|---|---|
| Title | Day Party Brunch Celebration |
| Date | Saturday, October 31, 2026 |
| Location | Pine Bluff Country Club · 1 Country Club Lane, Pine Bluff, AR 71603 |
| Time | 11:00 AM – 2:00 PM |
| Attire | Black & White with a touch of Red |
| Description | Join us for an afternoon of food, music, laughter, fellowship, and Mighty Zebra pride as we celebrate 40 years together in style! Enjoy great memories, fun photo moments, our exciting Silent Auction, special recognition moments, and a heartfelt tribute honoring classmates who will always remain part of our Zebra family. |
| Highlights | Silent Auction · Special Recognition · Memorial Tribute |

**Event 4: Blue Jeans & Bling Celebration**
| Field | Detail |
|---|---|
| Title | Blue Jeans & Bling Celebration |
| Date | Saturday, October 31, 2026 |
| Location | Venue TBD |
| Time | 7:00 PM – 11:00 PM |
| Attire | Blue Jeans & Bling |
| Description | Keep the reunion weekend going with a night of music, laughter, dancing, fellowship, and unforgettable memories with your Mighty Zebra family! Come relaxed, stylish, and ready to celebrate as we enjoy great vibes, reconnect with classmates, and party the night away. |

---

#### Sunday, November 1, 2026

**Event 5: Farewell Fellowship**
| Field | Detail |
|---|---|
| Title | Farewell Fellowship |
| Date | Sunday, November 1, 2026 |
| Location | TBA |
| Time | TBA |
| Description | Close out reunion weekend with fellowship, reflection, gratitude, and one final opportunity to reconnect with classmates before departure. Let's celebrate the memories we've shared, the friendships that have lasted through the years, and the lasting spirit of the Mighty Zebras. |
| Note | Additional details regarding Sunday activities will be announced soon. |

> Sunday event should display a **"Details Coming Soon"** badge/label.

---

#### Event Card Component Spec
Each event card should include:
- Day + Date badge (pill label, color-coded by day: Friday=red, Saturday=black, Sunday=gold)
- Event title (H3, Playfair Display)
- Location with map pin icon
- Time with clock icon
- Attire with hanger/shirt icon
- Description paragraph
- Highlights list (if applicable, with star or sparkle icons)
- Alert box for disclaimers (football ticket note, TBD notices)

---

### 7.4 Registration Page (`/register`)

#### Page Header
- **H1:** "Register for the Reunion"
- **Subtext:** "Please complete the registration form below. This form will collect your classmate information, guest information, event attendance, T-shirt order, donation/sponsorship selection, and payment confirmation."

#### Embedded Registration Section
- A clearly styled card/panel containing:
  - Brief instruction copy
  - A prominent **"Open Registration Form"** button (large, red, full-width on mobile)
    - Links to: `https://docs.google.com/forms/d/e/1FAIpQLSdIgVAcmLMtPMpgqFYPCauBkQCjJN3TZ4P0ugYodOh6_HCnRA/viewform`
    - Opens in new tab (`target="_blank"`)
  - Optionally: embed the Google Form via `<iframe>` as a secondary option below the button
    - iframe src: same Google Form URL + `?embedded=true`
    - Height: `800px`, width: `100%`, no border

#### What the Form Covers (visual checklist below the button)
Display 4 checklist items (icons + labels) in a 2×2 grid:
- 🎟 Event Registration
- 👕 T-Shirt Orders
- 💛 Donations & Sponsorships
- 👥 Guest Information

#### Support / Questions Section
- "Questions about registration?"
- Link to Facebook Group for community support

---

## 8. Responsive Design Requirements

| Breakpoint | Behavior |
|---|---|
| Mobile (`< 640px`) | Single column layouts, hamburger nav, stacked cards, full-width buttons |
| Tablet (`640px–1024px`) | 2-column grids, side-by-side event details |
| Desktop (`> 1024px`) | 3-column grids, full horizontal nav, expanded hero |

All Tailwind breakpoint classes (`sm:`, `md:`, `lg:`) must be used consistently. No horizontal scrolling at any breakpoint.

---

## 9. Component Tree (Suggested Structure)

```
src/
├── App.jsx                    # Router setup
├── main.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── CountdownTimer.jsx
│   ├── EventCard.jsx
│   ├── DayTabs.jsx
│   ├── AlertBox.jsx
│   └── ChecklistItem.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── EventsPage.jsx
│   └── RegisterPage.jsx
└── data/
    └── events.js              # Event data as JS objects/array
```

---

## 10. SEO & Meta

- Page `<title>`: "PBHS Class of 1986 — 40-Year Reunion | Pine Bluff, Arkansas"
- Meta description: "Join the Pine Bluff High School Class of 1986 for our 40-Year Reunion Weekend, October 30 – November 1, 2026. Register, view events, and celebrate 40 years of Mighty Zebra pride."
- Favicon: Zebra emoji or custom zebra icon (placeholder acceptable)
- Open Graph tags for Facebook link sharing

---

## 11. External Links & Integrations

| Resource | URL | Page Used |
|---|---|---|
| Registration Form | `https://docs.google.com/forms/d/e/1FAIpQLSdIgVAcmLMtPMpgqFYPCauBkQCjJN3TZ4P0ugYodOh6_HCnRA/viewform` | Register Page |
| Facebook Group | `https://www.facebook.com/share/p/1Csh6ANkvr/` | Footer, Home Page |

All external links: `target="_blank" rel="noopener noreferrer"`

---

## 12. Accessibility Requirements

- All images have meaningful `alt` attributes
- Color contrast meets WCAG AA minimum (4.5:1 for body, 3:1 for large text)
- All interactive elements are keyboard-navigable
- Focus rings visible on all focusable elements
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Form iframe has accessible `title` attribute

---

## 13. Out of Scope (v1)

- User authentication or login
- Backend/database (all data is static)
- Photo gallery (can be added in v2)
- Payment processing (handled via Google Form)
- CMS integration
- Email list / newsletter signup

---

## 14. Success Criteria

- Site renders correctly on Chrome, Safari, Firefox (desktop + mobile)
- All 3 pages accessible via navigation with no broken routes
- Registration form link opens correctly in new tab
- Countdown timer displays accurate days/hours/minutes/seconds to October 30, 2026
- Facebook link works on all pages
- No layout breaks at mobile, tablet, or desktop viewports
- Lighthouse score: Performance ≥ 85, Accessibility ≥ 90

---

*Document prepared for use with Claude Code · PBHS Class of 1986 Reunion Committee · 2026*
