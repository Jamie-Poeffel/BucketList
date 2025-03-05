# API Documentation Template

Welcome to the API documentation for the **Test Endpoint**. This documentation is designed for GitHub and uses collapsible sections so that you can quickly switch between a brief summary and a full, detailed view.

## Overview

- [`/users`](#endpoint-group-users)
  - [`D /users/:id`](#endpoint-delete-usersid)
- [`/auth`](#endpoint-group-auth)
  - [`P /auth/signup`](#endpoint-post-authsignup)
  - [`P /auth/login`](#endpoint-post-authlogin)

## Endpoint group `/users`

### Endpoint: DELETE `/users/:id`

> [!NOTE]
> This Call will delete a User from the id

  **Request:**  

- **Method:** `DELETE`  
- **URL:** `https://localhost:3000/users/:id`

  **Response (200 OK):**

```json
{
    "message": "User deleted successfully"
}
```

## Endpoint group `/auth`

### Endpoint: POST `/auth/signup`

> [!NOTE]
> This Call will create a new User

  **Request:**  

- **Method:** `POST`  
- **URL:** `https://localhost:3000/auth/signup`

- **body:**

```json
{
  "username": "John",
  "email": "John.doe@example.com",
  "password": "supersecred",
  "name": "John",
  "lastname": "doe" 
}
```

  **Response (201 Created):**

```json
{
    "message": "User successfully created",
    "id": "67c8b1485b953bcee56faa9e",
    "email": "john.doe@example.com"
}
```

### Endpoint: POST `/auth/login`

> [!NOTE]
> This Call will login the User

  **Request:**  

- **Method:** `POST`  
- **URL:** `https://localhost:3000/auth/login`

  **Response (200 OK):**

```json
{
    "message": "Authentication successful"
}
```

- **Cookies**
  - auth_token
  - refresh_token
