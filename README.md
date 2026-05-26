# Animal parade

A small, playful web-based amusement, part of Loopland amusement park (https://loopland.se). Built with Next.js and TypeScript.
When visitors choose "See an animal", a randomized animal appear. After the animation, the user receives a receipt with stamp, following Loopland's standards.

## Features

- Randomized animal selection with simple animation logic
- Clear flow: landing page -> animal page -> receipt page
- Responsive design styled with Tailwind CSS
- Fast routing using Next.js App Router
- Fully typed with TypeScript

## Project structure (simplified)

animal-parade/
│

├── app/

│ ├── page.tsx # Landing page

│ ├── animal/page.tsx # Animal page with animation

│ ├── receipt/page.tsx # Receipt page

│ ├── globals.css

│ └── layout.tsx

│

├── public/

│ └── animal-bg.jpg # Background image

│

├── components/

│ └── BackToBtn.tsx

│

└── libs/

│ └── types.ts # Types for animals, stamps, etc.

## Tech stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Vercel deployment

## Getting started

Install dependencies:
pnpm install

Run developkment server:
pnpm dev

Then open:
http://localhost:3000

## Deployment

Deployed on Vercel:
https://animal-parade-sand.vercel.app

## License

MIT License
