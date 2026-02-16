
# Brand Automotive - Luxury Performance Platform

A modern, high-performance React application representing a luxury automotive brand. This project demonstrates a professional frontend architecture using React, Tailwind CSS, and TypeScript without the need for a complex build step.

## 🚀 Features

*   **Immersive UI**: 3D-style interactions, scroll reveals, and luxury aesthetic.
*   **Comprehensive Navigation**: Full routing system covering Collection, Product Details, About, Contact, and User Areas.
*   **User Management**: Simulated Authentication (Login/Signup) and User Dashboard.
*   **Admin Panel**: Restricted area for inventory and site configuration management.
*   **Dynamic Filtering**: Advanced filtering for vehicle collections.
*   **Responsive Design**: Fully responsive layout optimized for mobile, tablet, and desktop.

## 🛠 Tech Stack

*   **Core**: React 18, TypeScript
*   **Styling**: Tailwind CSS, Custom Animations
*   **Routing**: React Router DOM v6
*   **Icons**: Lucide React
*   **Architecture**: Context API for state management (Auth, Navigation, Data)

## 📦 Project Structure

```
├── components/   # Reusable UI components
├── contexts/     # Global state (Auth, Car Data, Navigation)
├── pages/        # Route components (Home, Collection, Admin, etc.)
├── services/     # API adapters and business logic
├── data/         # Static seed data
├── types.ts      # TypeScript interfaces
├── App.tsx       # Main application layout and routing
└── index.tsx     # Application entry point
```

## 🏃‍♂️ How to Run

This project uses standard ES Modules. You can run it using any static file server.

1.  **Clone the repository**
2.  **Serve the directory**
    *   Using Python: `python3 -m http.server 8000`
    *   Using Node (serve): `npx serve .`
    *   Using VS Code: Install "Live Server" extension and click "Go Live"
3.  **Open in Browser**: Navigate to `http://localhost:8000` (or the port provided).

## 🔑 Demo Credentials

To access the Admin Panel:
*   **Email**: `admin@brand.com`
*   **Password**: (Any password works in demo mode)

## 📝 License

© 2025 Brand Automotive. All rights reserved.
