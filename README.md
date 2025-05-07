# User Service
![Development Status](https://img.shields.io/badge/status-in%20development-yellow)

A microservice which handles user registration, authentication and account management.

---

### Endpoints
#### Authentication
| Route | Description                                          
|-------|-------------
| <kbd>POST /v1/auth/register</kbd> | Register a new user
| <kbd>POST /v1/auth/login</kbd> | Authenticate and return a JSON Web Token (JWT)
| <kbd>POST /v1/auth/verify</kbd> | Verify a JWT and get contents
| <kbd>POST /v1/auth/logout</kbd> | Return a logout notification

#### User Profile
| Route | Description                                          
|-------|-------------
| <kbd>GET /v1/users/me</kbd> | Return current user profile
| <kbd>PUT /v1/users/me</kbd> | Update current user profile
| <kbd>DELETE /v1/users/me</kbd> | Delete current user profile
| <kbd>GET /v1/users/by-username/:username</kbd> | Return specific user profile

#### Documentation
(Only available in development environment)
| Route | Description                                          
|-------|-------------
| <kbd>GET /v1/docs</kbd> | Serves a web-page with API documentation

#### Health
| Route | Description                                          
|-------|-------------
| <kbd>GET /health</kbd> | Return server status

---

### Setup

#### Local Development

##### Prerequisites

- Node.js (>= 18.x)
- npm (>= 9.x)
- [MongoDB Cloud Database Cluster](https://www.mongodb.com/products/platform/cloud)

##### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/draff1800/user-service.git
    cd user-service
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    - Create a `.env`:

      ```bash
      cp .env.example .env
      ```

    - Adjust its values based on your desired configuration:

      - `PORT`: Port the service will run on
      - `NODE_ENV`: Environment configuration (`development` or `production`)
      - `DB_USER`: MongoDB Database User username
      - `DB_PASSWORD`: MongoDB Database User password
      - `DB_CLUSTER_NAME`: MongoDB Cluster name
      - `DB_DATABASE_NAME`: MongoDB Database name
      - `JWT_SECRET`: The secret key used to sign JSON Web Tokens

4. Start the service:

    - Development mode (server restarts on code changes):

      ```bash
      npm run start-dev
      ```

    - Production mode (compiles to `dist` and runs):

      ```bash
      npm run clean
      npm run build
      npm run start-build
      ```
