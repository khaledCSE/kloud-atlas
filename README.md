# Kloud Atlas - Your Next-Gen Cloud Storage Solution

> Empowering Teams & Individuals with Seamless File Management and Collaboration.
> Kloud Atlas is a robust Google Drive alternative designed for modern workflows, offering secure storage, advanced file management, and intuitive collaboration features.

<center>
  <img src="https://github.com/khaledCSE/kloud-atlas/blob/main/public/docs/Kloud-Atlas-Cover.png?raw=true" />
</center>

## Overview

Built for performance, scalability, and simplicity, Kloud Atlas streamlines file management and sharing. With cutting-edge features like email OTP authentication, multi-file uploads, and advanced search, it caters to developers and businesses seeking a reliable cloud storage solution.

<center>
  <img src="https://github.com/khaledCSE/kloud-atlas/blob/main/public/docs/dashboard.png?raw=true" />
</center>

## Core Features

### 🚀 File Management Made Easy

- Single & Multi-file Uploads: Drag-and-drop or select files for batch uploads.
- Shareable Links: Generate secure, time-limited links to share files instantly.

### 📊 Insights at Your Fingertips

- Usage Dashboard: Real-time metrics on storage usage and file activity.

### 🔐 Secure Authentication

- Email OTP Login/Signup: Built-in secure authentication system powered by Appwrite.

### 🔎 Search & Organize

- Advanced Querying: Search, sort, filter, and paginate files with ease.

<center>
  <img src="https://github.com/khaledCSE/kloud-atlas/blob/main/public/docs/file-sharing.png?raw=true" />
</center>

## Tech Stack

- Language: TypeScript
- Framework: Next.js v15
- UI Library: React v19 with ShadCN
- Styling: Tailwind CSS
- Backend-as-a-Service: Appwrite
- Storage & Mailing: Appwrite

## Why This Stack?

- Scalability: Appwrite's modular architecture ensures seamless scaling.
- Performance: Next.js 15's server-rendering optimizes loading speeds.
- Developer Experience: TypeScript, ShadCN, and Tailwind provide clean, maintainable code.

## Architecture Overview

<center>
  <img src="https://github.com/khaledCSE/kloud-atlas/blob/main/public/docs/Kloud-Atlas-Arch-Diag.png?raw=true" />
</center>

## Setup Guide

### Prerequisites

- Node.js v16+
- Appwrite Server configured with required services.

### Steps to Run Locally

- Clone the Repository:

```bash
git clone https://github.com/your-username/kloud-atlas.git
cd kloud-atlas
```

- Install Dependencies:

```bash
pnpm install
```

- Set Up Environment Variables

Add the following to `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_PUBLIC_APPWRITE_DATABASE=
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=
NEXT_PUBLIC_APPWRITE_BUCKET=
NEXT_API_KEY=
```

- Run Development Server:

```bash
pnpm dev
```

## Deployment

Kloud Atlas is deployed on Vercel, leveraging its optimized serverless infrastructure for seamless scalability and global performance.

## Try It Now

[Live Demo: Kloud Atlas](https://kloud-atlas.vercel.app/sign-in)

### Why Vercel?

- Blazing Fast Edge Network: Optimized delivery for dynamic and static content.
- Serverless Functions: Ideal for Next.js's hybrid features like API routes.
- CI/CD Integration: Automatic builds and deployments on every Git push.

## Future Roadmap

- Real-time Collaboration: Support for live file editing and commenting.
- AI-powered Features: Content-based search and auto-tagging.
- Mobile Apps: Native Android and iOS apps.
- Third-party Integrations: Google Drive, Dropbox, and Slack.
- Work with dedicated backend and databases instead of BaaS

## Contact

Feel free to reach out if you have questions, feedback, or collaboration opportunities:

[LinkedIn](https://linkedin.com/in/khaledCSE10) | [Email](mailto:khaledcse30@gmail.com)
