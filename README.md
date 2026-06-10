# Lume Corp Event Planning Platform

This repository contains a full-stack event planning application built with **Next.js 16**, **React 19**, and integrated AI, mapping, layout, and export workflows.

> Latest full project branch: `master`

## Project Overview

This platform is designed for venue planners, event designers, and operations teams who need a single interface for:

- Creating and validating venue layouts with a visual drag-and-drop canvas.
- Generating AI-driven event recommendations for budgets, menus, vendors, and collateral.
- Using geospatial data to plan location-specific details with maps and POI lookups.
- Exporting production-ready documents like PDFs, posters, and invitation assets.
- Managing review workflows with email invites and layout review support.

## Key Features

- Visual event design and layout builder
- Budget optimization and vendor/menu recommendation engine
- Map integration with venue selection and POI/location support
- AI-powered content generation and planning assistance
- PDF/poster generation, QR code exports, and email invite workflows
- Weather lookup and event timeline planning
- 3D/visual effects support for immersive presentation

## Technology Stack

### Frontend
- Next.js + React 19
- Tailwind CSS, PostCSS, Autoprefixer
- `@dnd-kit/core` for drag-and-drop
- `framer-motion`, `gsap` for animations
- `three`, `@react-three/fiber`, `@react-three/drei`, `maath` for graphics
- `maplibre-gl`, `leaflet`, `react-leaflet` for maps
- `recharts`, `lucide-react`, `clsx`, `html-to-image`, `qrcode`

### Backend / Integrations
- Next.js API routes
- `nodemailer` for emails
- `cashfree-pg` for payments/order workflows
- `cloudinary` for media handling
- `openmeteo` for weather data
- `uuid` for utilities

### AI / ML
- `openai`
- `@google/genai`, `@google/generative-ai`
- `@huggingface/inference`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Branch Note

The current complete implementation is available on branch `master`, which includes the full event workflow, AI enhancements, map integration, and UI polish.

## Notes

- Environment secrets and API keys should be configured in `.env.local`.
- The application is organized under `src/app` with a dedicated `(eventFlow)` route for the event planning workflow.
- Components and utilities are located in `src/components`, `src/lib`, and `src/store`.
