# Car Management App

A full-stack car management application built using **Next.js**, **Prisma**, **MongoDB**, and **TailwindCSS**.
This app allows users to create, view, update, and delete car listings, with features like image upload, dark mode, and authentication.

## Features

- **CRUD Operations**: Create, read, update, and delete car listings.
- **Image Upload**: Upload car images using Cloudinary with a maximum of 10 images per listing.
- **Search Functionality**: Search for cars by their title with case-insensitive queries.
- **Dark Mode**: Toggle between light and dark themes for better usability.
- **Authentication**: User authentication implemented via Clerk.
- **Responsive Design**: Fully responsive UI for seamless use across devices.

---

## Tech Stack

- **Frontend**: Next.js (React-based framework)
- **Backend**: Prisma ORM with MongoDB
- **Styling**: TailwindCSS
- **Image Storage**: Cloudinary
- **Authentication**: Clerk

---

## Installation

### Prerequisites

- Node.js (>= 18.x)
- npm or yarn
- MongoDB instance (local or cloud-based like MongoDB Atlas)
- Cloudinary account for image uploads

### Steps to Install

1. **Clone the Repository**
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
Install Dependencies

bash

npm install
# or
yarn install


Set Up Environment Variables Create a .env file in the root directory and add the following:

env

DATABASE_URL=mongodb+srv://<your-db-username>:<your-db-password>@<your-cluster-url>/<your-db-name>?retryWrites=true&w=majority

CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>

CLOUDINARY_API_KEY=<your-cloudinary-api-key>

CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

Generate Prisma Client Run the following command to generate the Prisma client:

npx prisma generate
Run Database Migrations

npx prisma db push




Start the Development Server

npm run dev
# or
yarn dev


Open http://localhost:3000 in your browser to see the app.


