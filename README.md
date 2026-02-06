# Gemini Hero Sandbox

Standalone Vite + React app. Clone/deploy-safe (no parent-repo paths).

## Run the dev server

From **this folder** (gemini-gemini-sandbox), not the parent repo:

```bash
cd gemini-gemini-sandbox
npm install
npm run dev
```

Vite will open a browser; if port 3001 is in use it may use **3002** (or the next free port). **Use the URL Vite prints in the terminal** (e.g. `http://localhost:3002`) and update any bookmark to that URL. Tab title should be **"Gemini Hero - Sandbox | AreTéCracy"**.

If you run `npm run dev` from the parent `Aretecracywebsite` folder, you get the **main** app (usually port 3000; title "AreTéCracy - Virtue-Based Democratic...").

## Errors like "Loading failed for the module... localhost:3001" on port 3002?

The page is on 3002 but something is still requesting 3001. Fix it by:

1. **Close any tab** that’s open to `http://localhost:3001`.
2. On the **3002** tab, do a **hard refresh**: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac).
3. Update your **"gemini-sandbox"** bookmark to the URL Vite shows when you run `npm run dev` (e.g. `http://localhost:3002`).

## Blank page?

- **Preload warnings** for `hero-background-large.webp` / `logo-banner-large.webp` and title **"AreTéCracy - Virtue-Based Democratic"** = you're on the **main** app, not the sandbox. Start the sandbox from this folder and open **http://localhost:3001**.
- If the sandbox still shows a blank page, an error boundary will show the message; also open DevTools → Console and look for red errors.

## Build

```bash
npm run build
```

For GitHub Pages, set `base: '/your-repo-name/'` in `vite.config.ts` before building.
