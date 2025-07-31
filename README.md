# ServiceConnect - A Sulekha.com Clone

This repository contains a clone of Sulekha.com, a local services marketplace that connects service providers with customers. The website is built using HTML, CSS, and JavaScript.

## Live Demo

The website is hosted on GitHub Pages and can be accessed at [https://adirapatil.github.io/](https://adirapatil.github.io/).

## Features

- **Service Listings**: Browse through various service categories
- **Service Provider Profiles**: View detailed information about service providers
- **Search Functionality**: Search for services by name and location
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **User Authentication**: Login and signup functionality (frontend only)
- **Interactive UI**: Smooth scrolling, hover effects, and more

## Project Structure

```
adirapatil.github.io/
├── docs/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   ├── provider1.jpg
│   │   ├── provider2.jpg
│   │   ├── provider3.jpg
│   │   ├── user1.jpg
│   │   ├── user2.jpg
│   │   └── app-mockup.png
│   └── index.html
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/adirapatil/adirapatil.github.io.git
   ```

2. Navigate to the project directory:
   ```
   cd adirapatil.github.io
   ```

3. Add images to the `docs/images` directory:
   - `hero-bg.jpg`: A background image for the hero section (recommended size: 1920x1080px)
   - `provider1.jpg`, `provider2.jpg`, `provider3.jpg`: Images for service providers (recommended size: 120x120px)
   - `user1.jpg`, `user2.jpg`: Images for user testimonials (recommended size: 50x50px)
   - `app-mockup.png`: An image of a mobile app mockup (recommended size: 300x600px)

4. Install dependencies:
   ```
   npm install
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the website.

You can also open `docs/index.html` directly in your web browser for a static view without the development server.

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process uses the contents of the `docs` folder.

To deploy your own version:

1. Fork this repository
2. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Select "main" branch and "/docs" folder
   - Click Save

## Customization

You can customize the website by:

1. Modifying the HTML structure in `index.html`
2. Updating styles in `css/style.css`
3. Extending functionality in `js/script.js`
4. Replacing images in the `images` directory

## Development Server

The project includes a Node.js development server with the following features:

- Serves static files from the `docs` directory
- Automatically reloads the page when HTML or JavaScript files change
- Updates CSS without page reload when CSS files change
- Uses Socket.io for real-time communication between the server and browser

### Running the Development Server

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

The server will watch for file changes in the `docs` directory and automatically update the browser.

## Future Enhancements

- Backend integration for user authentication and data storage
- Service booking functionality
- User reviews and ratings system
- Payment integration
- Service provider dashboard
- Admin panel for content management

## Credits

- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- Inspired by [Sulekha.com](https://www.sulekha.com)

## License

This project is open source and available under the [MIT License](LICENSE).
