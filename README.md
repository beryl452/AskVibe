# AskVibe
## Introduction
AskVibe is an interactive event management platform designed to enhance event experiences by providing real-time Q&A sessions, voting mechanisms, and robust role-based access control. Whether it's a public conference or a private workshop, AskVibe makes it easy to manage events and engage participants.

## Features
- **Event Management:** Create and manage events, set event visibility (public/private), and invite participants.
- **Role-Based Access** Control: Assign roles (Admin, Moderator, Participant) with specific permissions for each event.
- **Interactive Q&A:** Allow participants to ask questions, post answers, and vote on them in real-time.
- **OAuth Authentication:** Secure authentication using GitHub OAuth.
- **Real-Time Communication:** Seamless real-time updates for questions and answers during the sessions.

## Technologies Used
* **Backend:** AdonisJS
* **Frontend:** ReactJS with InertiaJS
* **Database:** PostgreSQL
* **Deployment:** Docker and Docker Compose
* **Authentication:** OAuth with GitHub

### Installation

### **Prerequisites**

Node.js
Docker and Docker Compose
PostgreSQL

### Setup

Clone the repository



```sh
git clone https://github.com/yourusername/askvibe.git
cd askvibe
```

### Install dependencies


`npm install`

Set up environment variables Create a .env file in the root directory and configure it with your settings. Use .env.example as a template.

### Run Migrations

`node ace migration:run`

Start the server

`npm run dev`
