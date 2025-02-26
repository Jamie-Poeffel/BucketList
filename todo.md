# Bucket List Web App To-Dos

## Frontend (Vue.js)

### 1. Project Setup
- [ ] **Initialize Project**
  - [ ] Use Vue CLI to scaffold a new project
  - [ ] Set up folder structure (components, views, services, assets, etc.)
- [ ] **Install Dependencies**
  - [ ] Install Vue Router (for navigation)
  - [ ] Install Vuex/Pinia (for state management)
  - [ ] Install Axios (for API calls)
  - [ ] Configure ESLint/Prettier for code quality

### 2. UI/UX & Design
- [ ] **Wireframe Pages**
  - [ ] Home/Landing page
  - [ ] Signup/Login page
  - [ ] Dashboard (listing bucket list items)
  - [ ] Detail view for individual bucket list items
  - [ ] Profile and settings pages
- [ ] **Responsive Design**
  - [ ] Create a mobile-friendly layout
  - [ ] Consider using CSS frameworks (e.g., Tailwind, Bootstrap Vue)
- [ ] **Visuals**
  - [ ] Choose a color scheme and typography
  - [ ] Select icons/images (or use an icon library like Font Awesome)

### 3. Routing & Navigation
- [ ] **Setup Vue Router**
  - [ ] Define routes for Home, Login, Signup, Dashboard, Bucket List Detail, Profile, etc.
- [ ] **Navigation Guards**
  - [ ] Implement route protection for authenticated pages

### 4. State Management
- [ ] **Setup Vuex/Pinia**
  - [ ] Create modules/stores for user authentication and bucket list data
- [ ] **Implement Actions & Mutations**
  - [ ] Handle login, logout, and registration actions
  - [ ] Manage bucket list items (add, edit, delete, mark as complete)

### 5. Authentication
- [ ] **Build Forms**
  - [ ] Create signup and login components with validation
- [ ] **API Integration**
  - [ ] Use Axios to call Express API for authentication
  - [ ] Store JWT tokens securely (e.g., localStorage)
  - [ ] Implement auto-login/logout features

### 6. Bucket List Features
- [ ] **Dashboard**
  - [ ] Display a list of bucket list items
  - [ ] Add filtering/sorting (by category, status, deadline)
- [ ] **CRUD Operations**
  - [ ] Create a form to add new bucket list items (fields: title, description, deadline, category, images, notes)
  - [ ] Implement edit and delete functionality
  - [ ] Allow marking items as completed
- [ ] **Detail View**
  - [ ] Build a page to show full details of an item
  - [ ] Provide options to share or mark as favorite

### 7. Social/Sharing Features
- [ ] **Sharing Options**
  - [ ] Add social media share buttons
  - [ ] Allow users to set items as public or private

### 8. Notifications/Reminders
- [ ] **Reminder Setup**
  - [ ] Integrate a notifications library or browser notifications
- [ ] **Settings Page**
  - [ ] Create a page for users to set notification preferences
- [ ] **UI Indications**
  - [ ] Highlight items with upcoming deadlines

### 9. PWA/Mobile Optimization
- [ ] **PWA Setup**
  - [ ] Configure `manifest.json` and service worker for offline capabilities
- [ ] **Performance Optimization**
  - [ ] Optimize images and assets
  - [ ] Test responsiveness on multiple devices

### 10. Testing & Deployment
- [ ] **Testing**
  - [ ] Write unit tests for components (using Jest/Vue Test Utils)
  - [ ] Perform manual testing across different browsers and devices
- [ ] **Deployment**
  - [ ] Build production bundle
  - [ ] Deploy on platforms like Netlify or Vercel
  - [ ] Configure environment variables (API endpoints, etc.)

---

## Backend (Express.js)

### 1. Project Setup
- [ ] **Initialize Project**
  - [ ] Set up a new Node.js project with Express
  - [ ] Organize folder structure (routes, controllers, models, middleware)
- [ ] **Install Dependencies**
  - [ ] Install Express, dotenv, cors, bcrypt, jsonwebtoken
  - [ ] Install ORM/ODM (Mongoose for MongoDB or Sequelize for SQL)
  - [ ] Install Multer (for file uploads) and express-validator (for input validation)

### 2. Database & Models
- [ ] **Choose a Database**
  - [ ] Decide between MongoDB (with Mongoose) or PostgreSQL (with Sequelize)
- [ ] **Define Models**
  - [ ] **User Model:** username, email, hashed password, profile info
  - [ ] **Bucket List Item Model:** title, description, images, notes, deadline, status (complete/incomplete), privacy (public/private), and user reference

### 3. Authentication & Authorization
- [ ] **User Authentication Endpoints**
  - [ ] POST `/signup` – Register a new user
  - [ ] POST `/login` – Authenticate and return a JWT token
- [ ] **Middleware**
  - [ ] Implement JWT verification middleware for protected routes
  - [ ] Use bcrypt for password hashing

### 4. API Endpoints
#### User Endpoints:
- [ ] GET `/profile` – Retrieve the logged-in user's profile
- [ ] PUT `/profile` – Update user profile details

#### Bucket List Endpoints:
- [ ] GET `/bucketlists` – Retrieve all bucket list items for the authenticated user
- [ ] GET `/bucketlists/:id` – Retrieve a specific bucket list item
- [ ] POST `/bucketlists` – Create a new bucket list item
- [ ] PUT `/bucketlists/:id` – Update an existing bucket list item
- [ ] DELETE `/bucketlists/:id` – Delete a bucket list item

#### Social/Sharing Endpoints:
- [ ] GET `/public/bucketlists` – Retrieve all public bucket list items

#### Notifications/Reminders:
- [ ] (Optional) Create endpoints for managing notification settings and reminders

### 5. File Uploads
- [ ] **Image Uploads**
  - [ ] Set up Multer for handling image uploads
  - [ ] Configure storage options (local or cloud like AWS S3)
  - [ ] Validate file types and sizes

### 6. Middleware & Security
- [ ] **Error Handling**
  - [ ] Implement global error handling middleware
- [ ] **Input Validation**
  - [ ] Use express-validator to sanitize and validate inputs
- [ ] **CORS Configuration**
  - [ ] Configure CORS to allow requests from your frontend domain
- [ ] **Security Enhancements**
  - [ ] Implement rate limiting
  - [ ] Use Helmet for setting secure HTTP headers

### 7. Testing & Debugging
- [ ] **Write Tests**
  - [ ] Use Mocha, Chai, or Jest for unit/integration tests
- [ ] **API Testing**
  - [ ] Use Postman or Insomnia for endpoint testing
- [ ] **Logging**
  - [ ] Implement logging with Winston or Morgan

### 8. Deployment & Maintenance
- [ ] **Prepare for Production**
  - [ ] Configure environment variables (DB URI, JWT secret, etc.)
- [ ] **Deployment**
  - [ ] Deploy on platforms like Heroku, DigitalOcean, or AWS
  - [ ] Use a process manager (e.g., PM2) to manage the application
- [ ] **Documentation**
  - [ ] Create API docs (using Swagger or Postman collections)

### 9. Extra Features (Optional)
- [ ] **Real-time Updates**
  - [ ] Consider implementing Socket.io for live notifications or updates
- [ ] **Advanced Social Features**
  - [ ] Enable a follow/friend system for sharing bucket list progress
- [ ] **Analytics & Monitoring**
  - [ ] Add tools for monitoring usage and performance

---

This `todos.md` file should guide you step by step through building your bucket list web app with Vue.js and Express.js. Happy coding!