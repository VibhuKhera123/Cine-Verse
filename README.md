# CineMate - Your AI Movie Companion

## Project Description

CineMate is a personalized movie recommendation web application that uses AI to suggest movies based on your mood and preferences. Whether you're looking for trending hits, top-rated classics, or hidden gems, CineMate helps you discover the perfect film to match your current state of mind. Create custom watch-later plans and explore curated movie lists tailored just for you.

## Main Features

- Personalized movie recommendations based on your mood and preferences
- Browse featured, trending, top-rated, and recently added movies
- Interactive AI companion (CineMateChat) to help you find movies
- Custom watch-later plans with curated films
- Responsive and modern UI built with shadcn-ui and Tailwind CSS

## Project Structure

- `src/pages/`: Contains main pages like the home page (Index), movie detail pages, and a 404 NotFound page
- `src/components/`: Reusable UI components including layout (Navbar, Footer), shared components (HeroSection, MovieCarousel), and CineMate-specific components (CineMateButton, CineMateChat)
- `src/hooks/`: Custom React hooks
- `src/data/`: Mock movie data used for demonstration
- `src/lib/`: Utility functions
- `public/`: Static assets like images and icons

## Getting Started

### Prerequisites

- Node.js and npm installed (recommend using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation and Development

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server with hot reload
npm run dev
```

Open your browser and visit `http://localhost:5173` (or the port shown in your terminal) to see the app in action.

### Build and Preview

```sh
# Build the production version
npm run build

# Preview the production build locally
npm run preview
```

## How to Edit the Code

You can edit the code in several ways:


- **Use your preferred IDE**: Clone the repo and push changes. Requires Node.js & npm installed.

- **Edit files directly in GitHub**: Navigate to files, click the "Edit" button, make changes, and commit.

- **Use GitHub Codespaces**: Launch a Codespace environment from the repo and edit files directly.

## Technologies Used

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui (Radix UI components)
- React Router
- React Query
