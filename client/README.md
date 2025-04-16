# Carmitra - Client Documentation

Carmitra is a web application designed to assist users in gathering all the necessary information when purchasing a new car. The client-side of the application is built using React and styled with Tailwind CSS.

## Features

- **View Car Reviews**: Users can browse through reviews of various cars to make informed decisions.
- **Post a Review**: Users can submit their own reviews for cars they own or have experience with.
- **Top Rated Dealerships**: Users can find top-rated dealerships in their city, filtered by car brand.

## Getting Started

To get started with the client-side of the Carmitra application, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd carmitra/client
   ```

2. **Install Dependencies**:
   Make sure you have Node.js installed. Then, run:
   ```bash
   npm install
   ```

3. **Run the Application**:
   Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Folder Structure

- **src**: Contains all the source code for the React application.
  - **components**: Reusable components such as `CarReview`.
  - **pages**: Different pages of the application including `Home`, `Reviews`, `Dealerships`, and `SubmitReview`.
  - **App.tsx**: Main application component that sets up routing.
  - **index.tsx**: Entry point of the React application.

- **public**: Contains static files like `index.html`.

- **tailwind.config.js**: Configuration file for Tailwind CSS.

- **postcss.config.js**: Configuration file for PostCSS.

- **package.json**: Lists dependencies and scripts for the client-side project.

## Styling

Carmitra uses Tailwind CSS for styling. For more information on how to customize and use Tailwind CSS, refer to the [official documentation](https://tailwindcss.com/docs).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.