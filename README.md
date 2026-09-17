# W3 E-COMMERCE

A modern e-commerce storefront built with **Next.js 16 (App Router)**, **React 19**, **Redux Toolkit**, and **Tailwind CSS v4**. It ships with product browsing & filtering, infinite scroll, a persistent cart, a mock checkout flow, JWT-based authentication, and light/dark theming — all powered by the public [Platzi Fake Store API](https://fakeapi.platzi.com/).

**Live demo:** [w3-e-commerce.vercel.app](https://w3-e-commerce.vercel.app/)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [How It Works](#how-it-works)
  - [Data Source](#data-source)
  - [Authentication](#authentication)
  - [Cart](#cart)
  - [Checkout](#checkout)
  - [Theming](#theming)
- [Deployment](#deployment)
- [Known Limitations](#known-limitations)
- [License](#license)

---

## Features

- 🛍️ **Product catalog** — grid listing with infinite "load more" pagination
- 🔎 **Filtering & sorting** — by category, price range, and sort order (price, name, newest/oldest)
- 📄 **Product detail pages** — image slider, star ratings, mock reviews with a "helpful" vote button, and related products
- 🗂️ **Category browsing** — dedicated category cards on the home page
- ⭐ **Featured products** — curated carousel on the home page
- 🛒 **Persistent cart** — slide-out drawer, quantity/summary, backed by browser storage so it survives refreshes
- 💳 **Checkout flow** — order form with validation and a simulated payment step (no real payment processor involved)
- 🔐 **Authentication** — register/login against the Platzi Fake Store API, JWT access/refresh token handling, and protected routes via Next.js middleware
- 🌗 **Light/dark theme switch** — persisted across sessions
- 🔔 **Toast notifications** — via [`sonner`](https://sonner.emilkowal.ski/) for auth/cart feedback
- ⚡ **Server + client rendering mix** — product list pages are server-rendered on first load, then hydrate into client-driven infinite scroll and filtering

## Tech Stack

| Layer               | Technology                                              |
| ------------------- | -------------------------------------------------------- |
| Framework           | [Next.js 16](https://nextjs.org/) (App Router)          |
| UI Library          | [React 19](https://react.dev/)                          |
| State Management    | [Redux Toolkit](https://redux-toolkit.js.org/) + [react-redux](https://react-redux.js.org/) |
| Styling             | [Tailwind CSS v4](https://tailwindcss.com/)              |
| HTTP Client         | [Axios](https://axios-http.com/)                         |
| Icons               | [lucide-react](https://lucide.dev/)                      |
| Notifications       | [sonner](https://sonner.emilkowal.ski/)                  |
| Language            | TypeScript                                                |
| Linting             | ESLint (`eslint-config-next`)                             |
| Backend / Data API  | [Platzi Fake Store API](https://fakeapi.platzi.com/) (`api.escuelajs.co`) |
| Hosting             | [Vercel](https://vercel.com/)                             |

> **Note:** This project has no backend/server of its own — it's a client that talks directly to the public Platzi Fake Store API for products, categories, and authentication.

## Project Structure

The app lives inside the `client/` directory (a standard Next.js project); the repository root only holds shared top-level metadata.

```
W3_E_COMMERCE/
├── package.json                # Root-level shared deps (Redux Toolkit, react-redux)
└── client/                     # The actual Next.js application
    ├── app/                    # App Router routes
    │   ├── layout.tsx          # Root layout — providers, nav, footer, theming
    │   ├── page.tsx            # Home page (hero, categories, featured products)
    │   ├── providers.tsx       # Redux <Provider> wrapper
    │   ├── loading.tsx         # Root loading UI
    │   ├── global-error.tsx    # Root error boundary
    │   ├── globals.css         # Tailwind + global styles
    │   ├── auth/
    │   │   ├── layout.tsx      # Minimal passthrough layout (Next.js constraint)
    │   │   ├── _shell.tsx      # Shared auth page chrome (logo, title, subtitle)
    │   │   ├── login/page.tsx
    │   │   └── register/page.tsx
    │   ├── products/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx        # Server-rendered product grid + infinite scroll
    │   │   └── [id]/
    │   │       ├── page.tsx    # Product detail page
    │   │       └── api.ts      # Product/related-product/category fetchers
    │   └── checkout/
    │       ├── layout.tsx
    │       └── page.tsx        # Order summary + checkout form (protected route)
    ├── components/
    │   ├── auth/                # Login/register forms + shared field component
    │   ├── cart/                 # Cart drawer, cart item, summary, storage helper
    │   ├── checkout/              # Checkout form, validation, mock payment step
    │   ├── footer/                # Site footer
    │   ├── home/                  # Hero, categories, featured products, "why us"
    │   ├── modal/                 # Reusable modal/popup primitives
    │   ├── nav/                    # Navbar, cart button, logout button, theme switch
    │   ├── products/                # Product grid, filters, detail view, reviews
    │   └── theme/                    # Theme provider (light/dark)
    ├── hooks/
    │   └── use_cart.ts            # Cart-related hook
    ├── lib/
    │   ├── redux/
    │   │   ├── store.ts            # Redux store setup
    │   │   ├── hooks.ts             # Typed useAppDispatch / useAppSelector
    │   │   └── features/
    │   │       ├── auth.ts          # Login/register/session-validation thunks
    │   │       ├── cart.ts           # Cart slice
    │   │       ├── theme.ts           # Theme slice (persisted to localStorage)
    │   │       └── utils.ts            # Product list, filters, sort, modal visibility
    │   └── types/                    # Shared TypeScript types (product, auth, utils)
    ├── middleware.ts                 # Protects /checkout via access/refresh token check
    ├── next.config.ts
    ├── tsconfig.json
    └── package.json
```

## Getting Started

### Prerequisites

- **Node.js** 18.18+ (Node 20 LTS recommended, to match Next.js 16 / React 19 requirements)
- **npm** (or yarn/pnpm/bun — the project was scaffolded with `create-next-app` and has no hard dependency on npm specifically)

### Installation

```bash
# Clone the repository
git clone https://github.com/ajoad-0139/W3_E_COMMERCE.git
cd W3_E_COMMERCE/client

# Install dependencies
npm install
```

### Running locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Building for production

```bash
npm run build
npm start
```

## Environment Variables

**None required.** The app calls the public Platzi Fake Store API (`https://api.escuelajs.co/api/v1`) directly from client and server code, with the base URL hard-coded rather than pulled from an environment variable. There is no `.env` file in the project and nothing to configure to run it locally.

> If you fork this project to point at your own backend, you'd want to extract the hard-coded `API_BASE`/`API_URL` constants (found in `middleware.ts`, `lib/redux/features/auth.ts`, and `app/products/**`) into an environment variable such as `NEXT_PUBLIC_API_URL`.

## Available Scripts

Run these from inside `client/`:

| Script          | Description                              |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Starts the Next.js dev server              |
| `npm run build` | Builds the app for production              |
| `npm start`     | Runs the production build                  |
| `npm run lint`  | Runs ESLint over the project                |

## How It Works

### Data Source

All product, category, and user data comes from the [Platzi Fake Store API](https://fakeapi.platzi.com/), a free public REST API intended for practicing e-commerce frontends. This means:
- Product listings, categories, and product details are fetched live from `api.escuelajs.co`.
- New accounts created through the register form are created against that public API (not a private database owned by this project).
- Data can change or be reset by the API's maintainers at any time, independent of this codebase.

### Authentication

- Login and registration dispatch Redux thunks (`loginUser`, `createUser` in `lib/redux/features/auth.ts`) that call the Platzi API's `/auth/login` and `/users/` endpoints.
- On successful login, `access_token`/`refresh_token` are stored in both `localStorage` (for client-side session checks) and cookies (so `middleware.ts` can read them on the server).
- `middleware.ts` guards the `/checkout` route: it validates the access token against `/auth/profile`, and if expired, transparently refreshes it via `/auth/refresh-token` before allowing the request through. If both tokens are missing or invalid, the user is redirected to `/auth/login?redirect=<original path>`.
- Logging out clears tokens from localStorage, cookies, and Redux state.

### Cart

- Cart contents live in Redux (`lib/redux/features/cart.ts`) and are also persisted via `components/cart/cart_storage.ts` so the cart survives page reloads.
- The nav bar's cart button toggles a slide-out `CartDrawer` showing items, quantities, and a running subtotal.

### Checkout

- The `/checkout` page (protected by the middleware described above) calculates subtotal, a flat shipping rate, and tax, then renders a `CheckoutForm` with validation.
- Payment is **simulated** via `components/checkout/mock_payment.tsx` — no real payment gateway (Stripe, PayPal, etc.) is integrated. On "success," the user sees a confirmation screen with a generated transaction ID.

### Theming

- A `theme` Redux slice tracks light/dark mode and persists the choice to `localStorage` under the key `w3_e-commerce_theme`.
- `components/theme/theme-provider.ts` applies the stored/selected theme on load.

## Deployment

The live demo is deployed on **[Vercel](https://vercel.com/)**, which is a natural fit since the project is a Next.js app with no custom server or environment secrets to configure. To deploy your own copy:

1. Push the repo to GitHub/GitLab/Bitbucket.
2. Import it into Vercel, setting the **root directory** to `client/` (since the Next.js app is nested, not at the repo root).
3. No environment variables need to be set (see [Environment Variables](#environment-variables)).
4. Deploy — Vercel will run `npm run build` and serve the app.

## Known Limitations

- **No real payment processing** — checkout is a mock flow for demonstration purposes only.
- **No custom backend** — all persistence (products, categories, user accounts) is delegated to the third-party Platzi Fake Store API, so data isn't fully under this project's control.
- **Social links in the footer** (Facebook/Instagram/Twitter) are placeholders (`href="#"`).
- A few footer links (About, Contact, Privacy, Terms) are referenced in the UI but do not yet have corresponding routes implemented in `app/`.

## License

No license file is currently included in this repository. Add a `LICENSE` file (e.g. MIT) if you intend for others to reuse this code.

---

Built by [Ajoad Islam](https://github.com/ajoad-0139).
