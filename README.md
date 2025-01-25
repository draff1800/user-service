# Real-Time Collaboration Tool - User Service
One of three microservices powering the [Real-Time Collaboration Tool](#what-is-the-real-time-collaboration-tool).

![Development Status](https://img.shields.io/badge/status-in%20development-yellow)

### Description
Manages user registration, authentication and profile management.
Integrates with other microservices for operations related to user permissions or metadata.

### Endpoints
#### Authentication
| Route | Description                                          
|-------|-------------
| <kbd>POST /v1/auth/register</kbd> | Register a new user
| <kbd>POST /v1/auth/login</kbd> | Authenticate and generate a JWT token
| <kbd>POST /v1/auth/verify</kbd> | Verify whether a JWT token is valid
| <kbd>POST /v1/auth/logout</kbd> |  Invalidate a JWT token

#### User Profile
| Route | Description                                          
|-------|-------------
| <kbd>GET /v1/users/me</kbd> | Retrieve current user's profile
| <kbd>PUT /v1/users/me</kbd> | Update current user's profile
| <kbd>DELETE /v1/users/me</kbd> | Delete current user's profile
| <kbd>GET /v1/users/:userid</kbd> | Retrieve a specific user's profile

---

### What is the Real-Time Collaboration Tool?
A tool similar to Google Docs; Users are able to concurrently edit a shared document and see changes in real-time. Powered by a microservices-based back-end, it focuses on scalability and and efficient data synchronization.

Check out the other microservices:
* [Document Service](https://github.com/draff1800/real-time-collaboration-tool-document-service)
* [Sync Service](https://github.com/draff1800/real-time-collaboration-tool-sync-service)

