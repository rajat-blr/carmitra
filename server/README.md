# Carmitra Server Documentation

## Overview
Carmitra is a web application designed to assist users in gathering information while buying a new car. The server-side of the application is built using Express and provides APIs for managing car reviews and dealership information.

## Features
- **Car Reviews**: Users can view and submit reviews for various car models.
- **Dealership Information**: Users can access a list of top-rated dealerships based on their city and preferred car brands.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/carmitra.git
   ```
2. Navigate to the server directory:
   ```
   cd carmitra/server
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Server
To start the server, run the following command:
```
npm start
```
The server will be running on `http://localhost:5000` by default.

### API Endpoints
- **GET /api/cars**: Fetch all car reviews.
- **POST /api/cars**: Submit a new car review.
- **GET /api/dealerships**: Fetch top-rated dealerships based on city and brand.

## Folder Structure
- **src/controllers**: Contains the logic for handling requests related to cars and dealerships.
- **src/routes**: Defines the API routes for the application.
- **src/models**: Contains the data models for cars and dealerships.
- **src/index.ts**: Entry point for the Express application.

## License
This project is licensed under the MIT License. See the LICENSE file for details.