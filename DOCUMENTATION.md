# Swifters - AI Kids Interactive Storytelling Platform

## A. Project Overview

### Mission & Vision
Swifters is an innovative platform that leverages Artificial Intelligence to create interactive, personalized, and educational stories for children. Our mission is to make learning fun, engaging, and safe for kids by combining AI-driven story generation, animations, and voices with robust parental controls.

### Target Audience
The primary target audience is parents with young children aged 3-12 who are looking for a safe, educational, and entertaining digital experience for their kids.

### Core Modes
- **Kids Mode:** An interactive storytelling experience designed specifically for children.
- **Parents Mode:** A comprehensive dashboard for parents to customize, monitor, and control their child's experience.

## B. User Roles

- **Parent:** Manages child profiles, customizes stories, monitors progress, and sets parental controls.
- **Child:** The end-user who interacts with the stories and educational content.
- **Admin:** Manages the platform, moderates content, and views analytics.

## C. System Architecture

The system consists of the following interconnected components:

- **Frontend:** A responsive web application built with **React, Vite, and TailwindCSS**, utilizing the existing design system.
- **Backend:** A **Node.js and Express** server that handles user authentication, data management, and communication with AI services. The database is **MongoDB**.
- **AI Services:**
    - **OpenAI:** For generating story text.
    - **ElevenLabs:** For creating voice narrations.
    - **D-ID / RunwayML:** For generating animations.
- **Cloud Deployment:** The application will be deployed on **Vercel**.

### Database Flow
User (Parent/Child) -> Frontend -> Backend -> AI Services -> Story Output -> Frontend

## D. Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Framer Motion, Axios, React Router
- **Backend:** Node.js, Express, Mongoose, JSON Web Tokens (JWT), bcrypt
- **Database:** MongoDB Atlas
- **AI Services:** OpenAI, ElevenLabs, D-ID / RunwayML
- **Deployment:** Vercel, Render
- **Environment Management:** A `.env` file will be used to manage API keys and database connection strings.

## E. Database Schema

- **User:**
    - `name` (String, required)
    - `email` (String, required, unique)
    - `password` (String, required)
    - `role` (String, enum: ['Parent', 'Admin'], default: 'Parent')
- **ChildProfile:**
    - `parentId` (ObjectId, ref: 'User', required)
    - `name` (String, required)
    - `age` (Number, required)
    - `preferences` (Object, e.g., { color: 'blue', animal: 'lion' })
    - `photoUrl` (String, optional)
- **Story:**
    - `childId` (ObjectId, ref: 'ChildProfile', required)
    - `storyText` (String, required)
    - `audioUrl` (String, required)
    - `animationUrl` (String, required)
    - `createdAt` (Date, default: Date.now)

## F. AI Storytelling Pipeline

1. **Input:** The backend receives the child's profile data and preferences from the frontend.
2. **Story Generation:** The backend sends a formatted prompt to **OpenAI** to generate the story text.
3. **Voice Narration:** The generated story text is sent to **ElevenLabs** to create the audio narration.
4. **Visual Animation:** The story text and other parameters are sent to **D-ID** or a similar service to generate the animation.
5. **Output:** The final story, including the text, audio, and animation, is presented to the child in an interactive format on the frontend.

## G. Security & Privacy

- **Authentication:** User authentication will be handled using **JWT**.
- **Data Protection:** All sensitive data, including API keys and child information, will be stored securely.
- **Environment Variables:** A `.env` file will be used to manage all secret keys, and this file will be included in the `.gitignore` to prevent it from being committed to the repository.

## H. UI/UX Design System

The existing frontend design and color scheme will be used as the foundation for the UI/UX.

### Page Structure
- **Login / Register:** For user authentication.
- **Parent Dashboard:** To manage child profiles and view stories.
- **Kids Mode (Story Player):** The interactive interface for children to experience the stories.
- **Story Creation Screen:** Where parents can input their child's information and preferences.

### Color Palette & Typography
The existing color palette and typography from the current frontend design will be maintained.

### Accessibility Guidelines
- Use large, readable text.
- Ensure high color contrast.
- Design a kid-friendly, intuitive user interface.

## I. Development Roadmap

- **Phase 1: Documentation & Architecture:** (Current Phase) - Finalize the project documentation and system architecture.
- **Phase 2: Core Backend & Frontend Integration:** Develop the core backend functionality (user auth, database models) and integrate it with the frontend.
- **Phase 3: AI & Interactive Story Features:** Integrate the AI services and build the interactive story player.
- **Phase 4: Testing, QA, & Deployment:** Thoroughly test the application, fix bugs, and deploy to production.
