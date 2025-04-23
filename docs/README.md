# voca-http Documentation Site

This is the documentation site for the voca-http library, a lightweight, flexible HTTP client for modern web applications.

## Getting Started

To run the documentation site locally, follow these steps:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

To build the site for production:

```bash
npm run build
```

To export the site as static HTML:

```bash
npm run export
```

The static files will be generated in the `out` directory.

## Deploy to Netlify

This site is configured for easy deployment to Netlify:

```bash
npm run deploy
```

## Project Structure

- `pages/` - Next.js pages
- `src/components/` - React components
- `src/styles/` - Global styles
- `src/utils/` - Utility functions
- `public/` - Static assets

## Features

The documentation site includes:

- Comprehensive API reference
- Code examples
- Interactive demos
- Syntax highlighting
- Responsive design 