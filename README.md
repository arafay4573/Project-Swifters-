# Project Swifters – AI Story Video Generator

This is a full-stack application that allows users to generate personalized AI-based stories for kids and convert them into short animated videos with background music and narration.

## Features

-   **AI Story Generation:** Uses OpenAI's GPT-4 to generate personalized stories.
-   **AI Voice Generation:** Uses a Text-to-Speech API to create voice narrations.
-   **AI Video Generation:** Creates animated videos from the story and audio.
-   **User Authentication:** JWT-based authentication for user registration and login.
-   **Subscription Plans:** Free and Pro plans with Stripe integration.
-   **Cloud Storage:** Media files are stored in AWS S3.

## Tech Stack

-   **Frontend:** React, Vite, Tailwind CSS, Framer Motion
-   **Backend:** Node.js, Express.js, MongoDB
-   **APIs:** OpenAI, Stripe, AWS S3

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   MongoDB account
-   OpenAI API key
-   Stripe account and API keys
-   AWS account and S3 bucket credentials

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/project-swifters.git
    cd project-swifters
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### Configuration

1.  **Backend Environment Variables:**
    Create a `.env` file in the `backend` directory and add the following variables:

    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    OPENAI_API_KEY=your_openai_api_key
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    AWS_REGION=your_aws_region
    AWS_BUCKET_NAME=your_aws_bucket_name
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
    CLIENT_URL=http://localhost:3000
    ```

2.  **Frontend Environment Variables:**
    The frontend uses the backend URL for API calls. This is configured in the `vite.config.js` file.

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd backend
    npm start
    ```

2.  **Start the frontend development server:**
    ```bash
    cd ../frontend
    npm run dev
    ```

## Deployment

### Backend (Render)

1.  Create a new "Web Service" on Render and connect your GitHub repository.
2.  Set the "Build Command" to `npm install`.
3.  Set the "Start Command" to `npm start`.
4.  Add your environment variables in the "Environment" section.

### Frontend (Vercel)

1.  Create a new project on Vercel and connect your GitHub repository.
2.  Vercel will automatically detect the Vite configuration.
3.  Add your environment variables in the project settings.
4.  Deploy!
