# API Documentation Template

Welcome to the API documentation for the **Test Endpoint**. This documentation is designed for GitHub and uses collapsible sections so that you can quickly switch between a brief summary and a full, detailed view.

---

## Overview

- [`G /users`](#endpoint-group-users)
  - [`D /users/:id`](#endpoint-delete-usersid)

---

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
