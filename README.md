# User Service
A microservice which handles user registration, authentication and account management.

![Development Status](https://img.shields.io/badge/status-in%20development-yellow)

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
