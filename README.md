# RAG Travel Agent Frontend

A modern, interactive frontend application for an AI-powered travel agent that provides travel planning and recommendations through a conversational interface.

## Features

- **Interactive Homepage**

  - Responsive design with smooth animations
  - Video-based hero section with interactive elements
  - Smooth scrolling navigation
  - Interactive audio button for background music
  - Feature showcase with package recommendations

- **Authentication System**

  - User registration and login functionality
  - JWT-based authentication
  - Protected routes for authenticated users

- **AI Chat Interface**

  - Conversational UI for travel planning
  - Real-time chat with an AI travel assistant
  - 3D animated avatar with synchronized mouth movements
  - Text-to-speech capability for AI responses
  - Conversation threading system
  - Ability to create and manage multiple chat threads
  - Visual plane animation during longer responses

- **UI/UX Elements**
  - Modern and sleek design with gradients
  - Interactive buttons with hover animations
  - Audio toggle for background music
  - Responsive layout for all device sizes
  - Smooth page transitions
  - Loading animations

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **React Router v7** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **GSAP** - Animation library
- **Three.js** - 3D graphics
  - React Three Fiber - React renderer for Three.js
  - React Three Drei - Helper components for React Three Fiber
- **Web Speech API** - Text-to-speech functionality
- **Context API** - State management
- **ESLint** - Code linting
- **Genezio** - Deployment platform
- **Custom Fonts** - with @font-face imports
- **Responsive Design** - for all screen sizes
- **JWT Authentication** - Secure user sessions

## Local Development Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Steps to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/RAG-Travel-agent-frontend.git
   cd RAG-Travel-agent-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   - Create a `.env` file in the root directory based on `.env.example`
   - Configure the API endpoint if needed:
     ```
     # .env
     VITE_API_URL=https://your-backend-api.com
     ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

The build files will be generated in the `dist` directory and can be served using any static file server.

## Deployment

This project is configured for deployment with Genezio. The `genezio.yaml` file contains the necessary configuration for automatic deployment.

```bash
# Deploy with genezio
genezio deploy
```

## Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/context` - React Context providers
  - `/pages` - Main page components
  - `/constants` - Application constants
  - `/assets` - Static assets (images, fonts, etc.)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- 3D model and animations created with Three.js
- UI design inspired by modern design trends
- Background music and sound effects from [source]
