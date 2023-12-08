# Express Project

This project is an Express.js application that provides routes for user management, student statistics, and articles.

## Purpose

The purpose of this project is to demonstrate the use of Express.js for creating a RESTful API with various functionalities. It includes routes for managing users, retrieving student statistics, and handling articles.

## Installation

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd express-practice
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

## Running the Application

Start the Express server:
```
npm start
```

The server will be running on http://localhost:3000 by default.

## Routes

### Users

#### Get All Users
- **Endpoint:** `/users`
- **Method:** GET
- **Description:** Retrieve a list of all users.

#### Add a New User
- **Endpoint:** `/users`
- **Method:** POST
- **Description:** Add a new user to the system.
- **Validation:** The request body must be a valid JSON object.
 
Required properties: `firstName`, `lastName`, `email`, `password`, `address`.

- **Payload Example:**
  ```
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "address": "123 Main St"
  }
  ```


#### Get User by Email
- **Endpoint:** `/users/:email`
- **Method:** GET
- **Description:** Retrieve user details by email.

#### Update User by ID
- **Endpoint:** `/users/:id`
- **Method:** PATCH
- **Description:** Update user data by user ID.
- **Payload Example:**
  ```json
  {
    "email": "mynewemail@example.com"
  }
  ```

#### Delete User by Email
- **Endpoint:** `/users/:email`
- **Method:** DELETE
- **Description:** Delete a user by email.

### Students

#### Get All Students
- **Endpoint:** `/students`
- **Method:** GET
- **Description:** Retrieve a list of all students.

#### Find Worst Homework Score
- **Endpoint:** `/students/worst-homework`
- **Method:** GET
- **Description:** Find the student with the worst homework score.

### Articles

#### Get All Articles
- **Endpoint:** `/articles`
- **Method:** GET
- **Description:** Retrieve a list of all articles.

#### Add a New Article
- **Endpoint:** `/articles`
- **Method:** POST
- **Description:** Add a new article to the system.
- **Validation:** The request body must be a valid JSON object.
 
Required properties: `name`, `description`, `type`, `tags`.

- **Payload Example:**
  ```
  {
    "name": "Express.js Basics",
    "description": "Introduction to Express.js",
    "type": "tutorial",
    "tags": ["Express.js", "Web Development"]
  }
  ```

#### Update Article Tags
- **Endpoint:** `/articles/:id`
- **Method:** PATCH
- **Description:** Update tags of an article by article ID.
- **Payload Example:**
  ```
  {
    "tags": ["Node.js", "Web Development"]
  }
  ```

## Error Handling

Custom error-handling middleware is implemented to log errors and return appropriate error responses.
