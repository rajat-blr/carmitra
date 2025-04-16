# CarMitra

CarMitra is a car information platform that helps users find and review cars and dealerships.

## Prerequisites

- Node.js >= 16.0.0
- MongoDB installed and running locally
- Git

## Project Structure

The project is divided into two main parts:
- `client/`: React frontend built with Vite, TypeScript, and TailwindCSS
- `server/`: Express backend with TypeScript and MongoDB

## Setup Instructions

### 1. Clone the Repository

```bash
git clone [repository-url]
cd carmitra
```

### 2. Environment Setup

Create a `.env` file in the server directory:

```bash
# server/.env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/carmitra
```

### 3. Installing Dependencies

Install dependencies for both client and server:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 4. Running the Application

#### Development Mode

Start the backend server:
```bash
cd server
npm run dev
```

In a new terminal, start the frontend development server:
```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend will be available at `http://localhost:3000`

#### Production Build

To create production builds:

For the client:
```bash
cd client
npm run build
```

For the server:
```bash
cd server
npm run build
```

## Features

- Car reviews and ratings
- Dealership information and reviews
- Submit new car reviews
- Browse dealerships

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- CORS enabled

## License

MIT