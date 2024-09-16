# Note Master
## Overview

A note-taking app is a tool designed to help users organize their thoughts, ideas, and tasks in one place. It allows you to quickly jot down notes, create to-do lists, and store important information, making it easy to access whenever needed. Whether you're a student, professional, or just someone who wants to stay organized, a note app can simplify your life. They're an efficient way to keep track of everything, whether you're brainstorming ideas, managing projects, or just making grocery lists. Easy to use and accessible, a note-taking app can help you stay on top of your daily tasks and long-term goals.
 
**Deployed Link:** https://saurabh-note-master-frontend.vercel.app/

**Backend Deployed Link(server):** https://saurabh-note-master.onrender.com

## Frontend (ReactJs)

### Features

 **1. Login/Registration:** 
- Users can log in or register using their email and password.

**2. Dashboard:** 
- After logging in, users can view, create, edit, and delete their notes.

**3. Protected Routes:** 
- The dashboard is accessible only to authenticated users.

**4. Navigation Bar:** 
- Displays login/register links for non-authenticated users and a logout button for authenticated users.

**5. Password Reset:**

- **Forgot Password:** Users can request a password reset link by providing their registered email.
- **Reset Password:** Upon receiving the reset link via email, users can click it to reset their password by entering a new one.
- **Security:** The password reset link is protected by a secure token, and it expires after a set time (e.g., 10 minutes) for added security.

### Tech Stack
- React (for UI components and state management)
- Axios (for API requests)
- React Router (for routing)
- React Context(for global state management)
- Tailwind CSS (for styling)


## Installation

### Prerequisites

- Node.js and npm
- MongoDB (local or cloud instance)

### Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/saurabhs402/NoteMaster.git
   cd frontend
2. **Install Dependencies:**
     ```
     npm install
    ```
3. **Set Up Environment Variables:**

     Create a .env file in the root directory and add the following:

     ```
     REACT_APP_BASE_URL_BACKEND=http://localhost:3001.
     ```
     ```
4. **Start the Server:**
     ```
     npm start
     ```

      The API will be available at http://localhost:3000.




### Available Routes
- **/:** Homepage of application.
- **/login:** Login page for users.
- **/register:** Registration page for new users.
- **/dashboard:** Dashboard for managing notes (protected route).
- **/forgotPassword:** Page for resetting user password.
- **/resetPassword/:token:** Page used to set new password.



## Backend (NodeJs + ExpressJs)


### Features


**1. JWT Authentication:**

- Protects routes for creating, updating, and deleting notes.

**2. User Registration/Login:**

- Secure user registration and login with hashed passwords to ensure data security.

**3. CRUD Operations:**

- Users can create, read, update, and delete their notes, with all operations securely handled.

**4. Protected Routes:**

- Only authenticated users can access and manage their notes.

**5. Password Reset Functionality:**

- **Forgot Password:** Users can request a password reset link by providing their registered email address.
- **Password Reset Token:** A secure, time-limited token is generated and sent to the user's email to authorize password resets.
- **Reset Password:** Users can reset their password using the token sent via email, providing a secure and user-friendly way to recover access. 


### Tech Stack
- Node.js (for backend server)
- Express.js (for API routing)
- MongoDB + Mongoose (for database and data modeling)
- JWT (for authentication)
- bcryptjs (for password hashing)
- crypto (for generating secure tokens for password reset functionality)
- nodemailer (for sending password reset emails)

### Getting Started
**1. Clone the repository:**
```
git clone https://github.com/saurabhs402/NoteMaster.git
cd backend
```
**2. Install dependencies:**
```
npm install
```
**3. Set up the .env file in the root directory with the following values:**
```
PORT=3001
CONN_STR=your-mongodb-connection-string
JWT_SECRET_STR=your-jwt-secret-key
EMAIL=your-email-to-send-reset-link
EMAIL_PASSWORD=your-email-app-password
BASE_URL_FRONTEND=http://localhost:3000
```
**4. Run the Server**
```
npm start
``` 
**5. The backend server will run on http://localhost:3001**

## API Endpoints
 ### Authentication
 1. **POST /api/auth/register:** Register a new user

    **Example Request:**

     **Body(raw)**
     ```
      {
       "name":"Saurabh",
       "email":"saurabh.ss402@gmail.com",
       "password":"12345678",
       "confirmPassword":"12345678"
     }
      ```
     **Example Response:**
      ```
        {
        "_id": "66e7a7d91b2ea1c8e5ec6e52",
        "name": "Saurabh",
        "email": "saurabh.ss402@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTdhN2Q5MWIyZWExYzhlNWVjNmU1MiIsImlhdCI6MTcyNjQ1NzgxNywiZXhwIjoxNzI2NDYxNDE3fQ.lcl7Boc-0v_HaAcaNqWRq0MEd9jM8Jh4mk5qwwq8c7w"
    }
      ```
2. **POST /api/auth/login:** Authenticate a user and get a JWT token.

   **Example Request:**

    **Body(raw)**

    ```
     {
      "email":"saurabh.ss402@gmail.com",
      "password":"12345678"
     }
     ```
   **Example Response:**
   ```
    {
    "_id": "66e7a7d91b2ea1c8e5ec6e52",
    "name": "Saurabh",
    "email": "saurabh.ss402@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTdhN2Q5MWIyZWExYzhlNWVjNmU1MiIsImlhdCI6MTcyNjQ1ODEyNSwiZXhwIjoxNzI2NDYxNzI1fQ.IBXP2yjX3PVLnyVtIZ4sfn9ZtjniMHQaQ4kClAf-IWY"
   }
   ```

3. **POST /api/auth/forgotpassword**: Send the reset password link to email.

   **Example Request:**

   **Body(raw)**

    ```
     {
      "email":"saurabh.ss402@gmail.com"
     }
     ```
   **Example Response:**
   ```
   {
    "success": "success",
    "message": "Password reset link send to the user email"
    }
   ```
4. **PATCH /api/auth/resetPassword/:token -** User can reset the password using token sent over email.

   **Example Request:**

    **Body(raw)**

    ```
    {
     "password":"123456789",
     "confirmPassword":"123456789"
    }
     ```
   **Example Response:**
   ```
   {
    "success": "success",
    "message": "Password reset successfully."
   }
   ```

### Notes

1. **GET /api/notes**: Get all notes for the authenticated user

      **Example Request:**

    - **Headers**
      
      Authorization <token>
    
   **Example Response:**
      ```
     [
    {
        "_id": "66e7ae681b2ea1c8e5ec6e5a",
        "user": "66e7a7d91b2ea1c8e5ec6e52",
        "title": "Prepare Presentation",
        "description": "Prepare slides and notes for the upcoming presentation on Tuesday.",
        "createdAt": "2024-09-16T04:04:56.129Z",
        "updatedAt": "2024-09-16T04:04:56.129Z",
        "__v": 0
    },
    {
        "_id": "66e7aee41b2ea1c8e5ec6e5d",
        "user": "66e7a7d91b2ea1c8e5ec6e52",
        "title": "Read a Book",
        "description": "Read 20 pages of 'The Great Gatsby' before bed.",
        "createdAt": "2024-09-16T04:07:00.549Z",
        "updatedAt": "2024-09-16T04:07:00.549Z",
        "__v": 0
       }
   ]

     ```

2. **POST /api/notes**: Create a new note

     **Example Request:**

    - **Headers**

      Authorization <token>
    - **Body(raw)**
     ```
     {
      "title":"Prepare Presentation",
      "description":"Prepare slides and notes for the upcoming presentation on Tuesday."
   }
     ```
   **Example Response:**
      ```
     {
    "user": "66e7a7d91b2ea1c8e5ec6e52",
    "title": "Prepare Presentation",
    "description": "Prepare slides and notes for the upcoming presentation on Tuesday.",
    "_id": "66e7ae681b2ea1c8e5ec6e5a",
    "createdAt": "2024-09-16T04:04:56.129Z",
    "updatedAt": "2024-09-16T04:04:56.129Z",
    "__v": 0
   }
     ```

3. **PUT /api/notes/:id** (here id is noteid): Update an existing note.

     **Example Request:**

    - **Headers**
      
      Authorization <token>

     **Body(raw)**
     ```
     {
    "title":"Read",
    "description":"Read daily 20 pages of 'The Great Gatsby' before bed."
   }
     ```

     **Example Response:**
    ```
    {
    "_id": "66e7aee41b2ea1c8e5ec6e5d",
    "user": "66e7a7d91b2ea1c8e5ec6e52",
    "title": "Read",
    "description": "Read daily 20 pages of 'The Great Gatsby' before bed.",
    "createdAt": "2024-09-16T04:07:00.549Z",
    "updatedAt": "2024-09-16T04:10:24.329Z",
    "__v": 0
   }
    ```
4. **DELETE /api/notes/:id** (here id is noteid): Delete a note

    **Example Request:**

     - **Headers**
      
         Authorization <token>
  





