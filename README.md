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

#### Getting Started
1. Clone the repository:

    ```bash
    git clone https://github.com/draff1800/user-service.git
    cd user-service
    ```

2. Set up a [MongoDB Cloud Database Cluster and Database](https://www.mongodb.com/products/platform/cloud)
    - Note the connection URI (e.g. `mongodb+srv://<DB_USER>:<DB_PASSWORD>@<DB_CLUSTER_NAME>.fszttko.mongodb.net/<DB_DATABASE_NAME>?retryWrites=true&w=majority&appName=<DB_CLUSTER_NAME>`)

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

#### Local Development
1. Install the following prerequisites:
    - Node.js (>= 18.x)
    - npm (>= 9.x)

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the service:
    - Development mode (Service restarts on code changes):

      ```bash
      npm run start-dev
      ```

    - Build mode (Compiles to `dist` and runs):

      ```bash
      npm run clean
      npm run build
      npm run start-build
      ```

#### Container-Based Development
1. Install the following prerequisites:
    - Docker (>= 20.x)
    - Docker Compose (>= v2)

2. Containerize the service:
    - Docker Compose image (Relies on `.env`, restarts on code changes):

      To build and start: 
      ```bash
      npm run start-local-container
      ```

      To clean up after stopping: 
      ```bash
      npm run clean-local-container
      ```

      Note: `PORT` in `.env` must match `ports` values in `docker-compose.yaml` - i.e. `3000` -> `3000:3000`

    - Deployment-ready image (Relies on injected variables, static):

      To build and run **dev**:
      ```bash
      docker build -f Dockerfile.dev -t user-service:dev .

      docker run \
        -e PORT=<PORT> \
        -e DB_USER=<DB_USER> \
        -e DB_PASSWORD=<DB_PASSWORD> \
        -e DB_CLUSTER_NAME=<DB_CLUSTER_NAME> \
        -e DB_DATABASE_NAME=<DB_DATABASE_NAME> \
        -e JWT_SECRET=<JWT_SeCRET> \
        -p <PORT:PORT> \
        user-service:dev
      ```

      To build and run **prod**:
      ```bash
      docker build -f Dockerfile.prod -t user-service:prod .

      docker run \
        -e PORT=<PORT> \
        -e DB_USER=<DB_USER> \
        -e DB_PASSWORD=<DB_PASSWORD> \
        -e DB_CLUSTER_NAME=<DB_CLUSTER_NAME> \
        -e DB_DATABASE_NAME=<DB_DATABASE_NAME> \
        -e JWT_SECRET=<JWT_SECRET> \
        -p <PORT:PORT> \
        user-service:prod
      ```
    


