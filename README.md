# Solar Operations Platform Frontend

A modern, real-time React-based dashboard for monitoring, analytics, and management of solar farm operations.

## Features

- **Overview Dashboard:**
  - Real-time metrics (power output, efficiency, weather, etc.)
  - Live charts and system alerts
- **Asset Management:**
  - Inventory table with search/filter
  - Asset lifecycle and warranty tracking
  - Digital thread event log
- **Digital Twin:**
  - 3D solar farm layout image
  - Section performance and health
  - Predictive insights and integration status
- **Maintenance:**
  - Predictive maintenance scheduling
  - Maintenance schedule table with priorities
  - Alerts and completion rates
- **Analytics:**
  - KPI cards and comparison tools
  - Power generation and performance charts (Chart.js)
  - Weather impact, predictive insights, and industry benchmarks
  - Automated report summaries

## Tech Stack

- [React](https://react.dev/) (with Vite)
- [Chart.js](https://www.chartjs.org/) (via `react-chartjs-2`)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Modern ES6+ JavaScript

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
1. Clone the repository or download the source code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```
The output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## Project Structure

- `src/SolarOperationsPlatform.jsx` — Main dashboard and UI logic
- `public/` — Static assets (e.g., 3D solar farm layout image)
- `index.html`, `vite.config.js` — Vite configuration

## Customization
- Replace the 3D solar farm image in `public/` as needed.
- Update asset, maintenance, and analytics data in `SolarOperationsPlatform.jsx` for your use case.

## Credits
- 3D solar farm layout image: [source/attribution if required]
- Icons: [Lucide](https://lucide.dev/)

## License
[MIT](LICENSE)
