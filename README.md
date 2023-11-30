# Post Editor: A Web Application for Creating and Editing Posts

Post Editor is a web application that allows you to create and edit posts with rich text and images. You can use it to write blog posts, articles, tutorials, or any other type of content that you want to share online.

Post Editor is built with Next.js 14, Shadcn UI, Prisma, EditorJS, and a PostgreSQL database. It provides a user-friendly interface for creating, editing, and managing posts. It also integrates Cloudinary for seamless image upload, storage, and management.

![Post Editor screenshot]

## Features

Post Editor has the following features:

- **Create and Edit Posts**: You can easily create new posts and edit existing ones through a user-friendly interface.

- **Rich Text Editing**: The application integrates EditorJS for a customizable and user-friendly rich text editing experience.

- **Image Upload with Cloudinary**: You can utilize Cloudinary for seamless image upload, storage, and management in your posts.

- **Responsive Design**: The user interface is designed to be responsive, providing a seamless experience across various devices.

- **Server-Side Rendering (SSR)**: The application uses Next.js 14 for server-side rendering, improving performance and SEO.

- **Shadcn UI Components**: The application uses the UI components from Shadcn UI to enhance the overall aesthetics and usability of the application.

- **Prisma ORM**: The application uses Prisma as an Object-Relational Mapping (ORM) tool to interact with the PostgreSQL database.

## Tech Stack

Post Editor uses the following technologies:

- [Next.js 14](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [EditorJS](https://editorjs.io/)
- [Cloudinary](https://cloudinary.com/)

## Getting Started

To get started with Post Editor, you need to have the following prerequisites:

- Node.js and npm installed on your machine
- PostgreSQL database set up with appropriate credentials

### Installation

To install Post Editor, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/avishka-devinda/post-editor.git
   cd post-editor
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the PostgreSQL database and update the connection string in the .env file.

4. Run the database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Set up Cloudinary:

   - Sign up for a Cloudinary account.
   - Obtain your Cloudinary API key, API secret, and cloud name.
   - Update the .env file with your Cloudinary credentials.

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open your browser and navigate to http://localhost:3000 to view the application.

### Image Upload with Cloudinary

To enable image upload with Cloudinary, ensure your .env file is configured with your Cloudinary credentials.

#### Create a .env.local File

Create a .env.local file in the root of your project and configure it similar to the provided .env.example file. Add your Cloudinary credentials and any other sensitive information.

## Contributing

Contributions are welcome! Please follow the contribution guidelines.

## License

This project is licensed under the MIT License.

I hope this helps you improve your document. If you have any questions or feedback, please let me know. 😊