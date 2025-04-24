### Task Management Frontend

A modern React frontend application build to connects consultants with fitting projects by leveraging Multi-Agent AI Systems.

## 📋 Overview

This frontend application is built with modern web technologies and provides features including:

- Import project details via JSON.
- Receive ranked recommendations for the most suitable candidates.
- Understand the rationale behind each candidate recommendation.
- Send email notifications to promising candidates.
- Enjoy a modern and highly usable interface.

## 🛠️ Technology Stack

- **React 19**: Latest version of the React UI library

- **TypeScript**: For type-safe code

- **TailwindCSS 4**: Utility-first CSS framework for styling

- **Vite 6**: For fast development and optimized builds

- **React Router 7**: For client-side routing

- **TanStack Query (React Query)**: For efficient server state management

- **Radix UI**: For accessible UI primitives

- **React Hook Form**: For form state management

- **Zod**: For schema validation

- **Axios**: For API requests

- **Lucide React**: For icons

- **Prettier**: For formatting

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)

- [pnpm](https://pnpm.io/installation) (recommended) or npm/yarn

- Backend API running (see the [server README](../server/README.md))

### Installation

1\. Install dependencies:

```shellscript
cd client

pnpm install
```

2\. Start the development server:

```shellscript

pnpm run dev

```

3\. The application will be available at:

```plaintext

http://localhost:5173

```

## 🎨 UI Components

The application uses a component library built on top of Radix UI primitives:

- **Radix UI**: Accessible UI primitives

- Checkbox, Dropdown Menu, Label, Popover, Tabs, Toast, etc.

- **Tailwind CSS**: For styling

- **Lucide React**: For icons

- **class-variance-authority**: For component variants

- **clsx** and **tailwind-merge**: For conditional class names

## 📱 Responsive Design

The application is designed to work on various screen sizes with a responsive layout system:

- Desktop (1024px and above)

- Tablet (768px to 1023px)

- Mobile (below 768px)

## 🔄 State Management

- **TanStack Query**: For server state management (API data)

- **React Context**: For theme and specific feature-related global state

- **React Hook Form**: For form state management

- **Zod**: For form validation

- **Zustand**: For global state

## 🌐 API Integration

The frontend communicates with the backend API using Axios. The API services are organized in the `src/lib/api` directory with a custom Axios instance for consistent API calls.

## 🛠️ Development

### Code Style

The project uses ESLint for code quality:

```shellscript

# Check code style

pnpm run lint

```

### Adding New Features

1\. Create a new branch for your feature:

```shellscript

git checkout -b feature/your-feature-name

```

2\. Implement your changes following the existing patterns

3\. Add tests for your changes

4\. Submit a pull request

## ❓ Troubleshooting

### Common Issues

1\. **API Connection Issues**:

1\. Ensure the backend server is running

2\. Check the API URL in the Axios instance configuration

3\. Verify network connectivity

2\. **Build Issues**:

1\. Clear the node_modules and reinstall dependencies

2\. Check for TypeScript errors

3\. Verify the Vite configuration

3\. **UI Rendering Issues**:

1\. Check browser console for errors

2\. Verify CSS classes and TailwindCSS configuration

3\. Test in different browsers

## 📚 Additional Resources

- [React Documentation](https://react.dev/)

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

- [TanStack Query Documentation](https://tanstack.com/query/latest)

- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)

- [TailwindCSS Documentation](https://tailwindcss.com/docs)

- [React Hook Form Documentation](https://react-hook-form.com/docs)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
