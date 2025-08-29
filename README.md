# Complete Authentication System

A full-stack authentication system with Angular frontend and Express.js backend, featuring login, signup, and forgot password functionality.

## Features

- ✅ **User Registration** - Complete signup with validation
- ✅ **User Login** - Secure authentication with JWT tokens
- ✅ **Forgot Password** - Email-based password reset
- ✅ **Password Reset** - Secure token-based password reset
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Error Handling** - Comprehensive error messages
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Modern UI/UX** - Beautiful, accessible interface
- ✅ **Security** - Password hashing, JWT tokens, secure headers

## Tech Stack

### Frontend
- **Angular 20** - Modern reactive framework
- **Angular Signals** - Reactive state management
- **SCSS** - Advanced styling
- **Angular Router** - Client-side routing

### Backend (SSR)
- **Angular SSR** - Server-side rendering with Express.js
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **nodemailer** - Email sending
- **TypeScript** - Type-safe backend development

## Project Structure

```
├── src/                          # Angular frontend + SSR backend
│   ├── app/
│   │   ├── pages/
│   │   │   ├── landing/          # Landing page
│   │   │   ├── login/            # Login component
│   │   │   ├── signup/           # Signup component
│   │   │   └── forgot-password/  # Forgot password component
│   │   ├── services/
│   │   │   ├── auth.service.ts   # Frontend authentication service
│   │   │   └── auth-api.service.ts # Backend authentication API
│   │   └── app.routes.ts         # Routing configuration
│   ├── server.ts                 # SSR server with API endpoints
│   └── styles.scss               # Global styles
└── package.json                  # Dependencies
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Gmail example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=4000
```

**Note**: For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in EMAIL_PASS

### 3. Build the Application

```bash
npm run build
```

### 4. Start the SSR Server (Production build)

```bash
npm run serve:ssr
```

Or (directly, if already built):

```bash
npm run serve:ssr:my-app
```

Note: Do NOT run scripts with `node run ...`. Use `npm run ...`.

### 5. Start Development Server (CSR dev)

```bash
npm start
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password with token |
| GET | `/api/auth/verify-token` | Verify JWT token |

### Request/Response Examples

#### Signup
```json
POST /api/auth/signup
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "1234567890",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "1234567890",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Forgot Password
```json
POST /api/auth/forgot-password
{
  "email": "john@example.com"
}

Response:
{
  "success": true,
  "message": "If an account with that email exists, a password reset link has been sent"
}
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with 12 salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Email Validation**: Server-side email format validation
- **Token Expiration**: JWT tokens expire after 24 hours
- **Reset Token Security**: Password reset tokens expire after 1 hour
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Both client and server-side validation

## Development

### Running in Development Mode

1. **SSR Server**: `npm run serve:ssr:my-app` (serves both API and Angular app)
2. **Development**: `npm start` (Angular dev server with API proxy)

### Production Deployment

1. Build the application: `npm run build`
2. Start the SSR server: `npm run serve:ssr:my-app`
3. The server serves both the API and the built Angular app from `/dist/my-app/browser`

## Customization

### Styling
- Modify SCSS variables in component files
- Update color schemes in `$primary-color`, `$secondary-color`, etc.
- Customize animations and transitions

### Email Templates
- Update email HTML templates in `server/api/auth.js`
- Configure email service in the transporter setup

### Database Integration
- Replace in-memory storage with your preferred database
- Update user storage and retrieval logic in `server/api/auth.js`

## Troubleshooting

### Common Issues

1. **Email not sending**: Check email credentials and app passwords
2. **CORS errors**: Verify CORS configuration in server.js
3. **JWT errors**: Ensure JWT_SECRET is properly set
4. **Build errors**: Check Angular version compatibility

### Debug Mode

Enable debug logging by setting environment variables:
```bash
DEBUG=* npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Open an issue on GitHub
