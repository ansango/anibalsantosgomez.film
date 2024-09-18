# anibalsantosgomez.film

**anibalsantosgomez.film** is a portfolio website showcasing analog photography. Built with a modern tech stack, the site leverages Next.js and various libraries to deliver a smooth and interactive user experience.

## Features

- **Photo Gallery**: Display high-quality analog photographs in a visually appealing gallery.
- **Interactive Animations**: Enhance user experience with smooth animations using Framer Motion.
- **Contact Form**: Allows visitors to get in touch through a contact form powered by Nodemailer.
- **Content Management**: Easily manage site content with TinaCMS.
- **Validation**: Ensure robust data handling with Zod.

## Tech Stack

- **Next.js**: Framework for building the React application.
- **Framer Motion**: For animations and interactive effects.
- **Nodemailer**: For handling contact form submissions.
- **Sonner**: For user notifications and alerts.
- **TinaCMS**: For content management and site editing.
- **Zod**: For schema validation and data handling.

## Installation

1. **Clone the Repository**:
   Clone this repository to your local machine.
   ```sh
   git clone https://github.com/ansango/anibalsantosgomez.film.git
   ```

2. **Install Dependencies**:
   Navigate to the project directory and install the necessary dependencies.
   ```sh
   cd anibalsantosgomez.film
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory of the project and add your environment variables as follows:
   ```env
   # ENV
   NEXT_PUBLIC_TINA_CLIENT_ID=***
   TINA_TOKEN=***

   # AWS S3 config
   S3_REGION=***
   S3_BUCKET=***
   S3_ACCESS_KEY=***
   S3_SECRET_KEY=***
   NEXT_PUBLIC_BUCKET_URL=***

   # Nodemailer config
   NODEMAILER_PASS=***
   NODEMAILER_USER=***
   NODEMAILER_HOST=***
   NODEMAILER_PORT=***

   # Public URI
   NEXT_PUBLIC_WEB_URI=***

   # Google Analytics
   NEXT_PUBLIC_GA_MEASUREMENT_ID=***
   ```

4. **Run the Development Server**:
   Start the development server to see the application in action.
   ```sh
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. **View the Portfolio**:
   Navigate through the portfolio to explore the gallery of analog photographs.

2. **Contact Form**:
   Use the contact form to get in touch or send inquiries. Ensure your email configuration is set up correctly to handle submissions.

3. **Content Management**:
   Edit and manage content using TinaCMS, accessible via the provided interface.

## Deployment

For deployment, you can use Vercel or any other preferred hosting provider. Follow their respective documentation for deployment instructions.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the framework.
- [Framer Motion](https://www.framer.com/api/motion/) for animations.
- [Nodemailer](https://nodemailer.com/) for email handling.
- [Sonner](https://sonner.dev/) for notifications.
- [TinaCMS](https://tinacms.org/) for content management.
- [Zod](https://zod.dev/) for schema validation.

For any questions or support, please open an issue in the repository.
