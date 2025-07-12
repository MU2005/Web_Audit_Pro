# WebAudit Pro

A modern, professional web auditing tool built with Next.js 15, TypeScript, and Tailwind CSS. This application provides comprehensive website analysis with beautiful visualizations and detailed insights.

## Features

- **Website Auditing**: Analyze any website for performance, SEO, security, and accessibility
- **Mock Data Generation**: Generates realistic audit results for demonstration purposes
- **Beautiful UI**: Modern, responsive design with dark/light mode support
- **Interactive Charts**: Multiple chart types to visualize audit data
- **Score Cards**: Animated progress indicators for each audit category
- **Issue Tracking**: Detailed list of problems found with priority levels
- **Share & Copy**: Easy sharing and copying of audit results
- **History View**: Track previous audits (mock data)

## Pages

- **Home (`/`)**: Landing page with URL input form
- **Results (`/results`)**: Comprehensive audit results with charts and issues
- **History (`/history`)**: View previous audit results
- **About (`/about`)**: Information about the application
- **Contact (`/contact`)**: Contact form

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter a website URL on the home page
2. Select device type (mobile/desktop)
3. Click "Start Audit" to generate mock audit results
4. View detailed results with charts and recommendations
5. Share or copy results as needed

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── page.tsx        # Home page
│   ├── results/        # Results page
│   ├── history/        # History page
│   ├── about/          # About page
│   └── contact/        # Contact page
├── components/         # React components
│   ├── URLInputForm.tsx
│   ├── ScoreCard.tsx
│   ├── ChartDisplay.tsx
│   ├── IssueList.tsx
│   └── ...
└── styles/            # Global styles
```

## Current State

This is a **frontend-only application** that generates mock audit data. All functionality works without any backend dependencies, making it perfect for:

- Demonstrations and prototypes
- Frontend development practice
- UI/UX showcases
- Learning Next.js and React

## Future Enhancements

- Backend integration for real audit data
- Database for storing audit history
- User authentication
- Real-time audit processing
- PDF export functionality
- API endpoints for external integrations

## License

This project is open source and available under the [MIT License](LICENSE).
