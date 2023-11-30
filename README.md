# Post Editor

## Overview

Post Editor is a web application built with Next.js 14, Shadcn UI, Prisma, EditorJS, and a PostgreSQL database. It provides a user-friendly interface for creating, editing, and managing posts.

## Features

- **Create and Edit Posts**: Users can easily create new posts and edit existing ones through a user-friendly interface.

- **Rich Text Editing**: The application integrates EditorJS for a customizable and user-friendly rich text editing experience.

- **Image Upload with Cloudinary**: Utilize Cloudinary for seamless image upload, storage, and management in your posts.

- **Responsive Design**: The user interface is designed to be responsive, providing a seamless experience across various devices.

- **Server-Side Rendering (SSR)**: Next.js 14 is utilized for server-side rendering, improving performance and SEO.

- **Shadcn UI Components**: The UI components from Shadcn UI enhance the overall aesthetics and usability of the application.

- **Prisma ORM**: The application uses Prisma as an Object-Relational Mapping (ORM) tool to interact with the PostgreSQL database.

## Tech Stack

- [Next.js 14](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [EditorJS](https://editorjs.io/)
- [Cloudinary](https://cloudinary.com/)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- PostgreSQL database set up with appropriate credentials

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/avishka-devinda/post-editor.git
   cd post-editor
   Install dependencies:
bash
Copy code
npm install
Set up the PostgreSQL database and update the connection string in the .env file.

Run the database migrations:

bash
Copy code
npx prisma migrate dev
Set up Cloudinary:

Sign up for a Cloudinary account.
Obtain your Cloudinary API key, API secret, and cloud name.
Update the .env file with your Cloudinary credentials.
Start the development server:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000 to view the application.

Image Upload with Cloudinary
To enable image upload with Cloudinary, ensure your .env file is configured with your Cloudinary credentials.

Contributing
Contributions are welcome! Please follow the contribution guidelines.

License
This project is licensed under the MIT License.

sql
Copy code

Make sure to replace the Cloudinary URLs and credentials with yo