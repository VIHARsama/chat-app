# MERN Chat App

A real-time chat application built using the MERN (MongoDB, Express.js, React, Node.js) stack with user authentication and live messaging.

## Features

- **User Authentication**: Secure login and registration with JWT authentication.
- **Real-time Messaging**: Send and receive messages instantly using socket.io.
- **Image Transfer**: Ability to send and receive images in chat messages.
- **User List**: See a list of all registered users for easy selection.
- **Private Chats**: One-on-one direct messaging with other users.
- **Message Timestamps**: Each message includes the time it was sent.
- **Color Schemes**: Change between different color schemes.
- **MERN Stack**: Full-stack implementation with MongoDB, Express, React, and Node.js.
- **Secure Backend**: Password hashing and authentication for secure user data.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.io
- **Authentication**: JWT, bcrypt

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/VIHARsama/chat-app.git
    cd chat-app
    ```
    
2. Install dependencies for both client and server:
    
    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```
    
    
3. Create a [cloudinary](https://cloudinary.com/) account

4. Create a `.env` file in the `server` directory and add the following:
    
    ```env
    PORT=3000
    MONGODB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
    CLOUDINARY_API_KEY=cloudinary_api_key
    CLOUDINARY_API_SECRET=cloudinary_api_secret
    ```
    
5. Start the development server:
    
    ```sh
    cd server
    npm run dev
    ```
    
6. Start the frontend:
    
    ```sh
    cd client
    npm start
    ```
    
7. Open your browser and go to `http://localhost:5173`
