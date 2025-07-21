# GPS System Frontend

Frontend application for the GPS (Gestión de Productos y Servicios) system, connected to the GPS Gateway API.

## Features

- **Authentication System**: JWT-based authentication with role-based access control
- **User Management**: Register and manage users with different roles and permissions
- **Beneficiary Management**: Manage beneficiary information
- **Sales Management**: Handle sales transactions
- **Inventory Management**: Manage products, warehouses, and batches
- **Responsive Design**: Modern UI that works on desktop and mobile devices

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Angular CLI

## Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd UsersList-main
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
The application is already configured to use the GPS Gateway API at:
`https://api-gateway-production-f577.up.railway.app`

## Development

1. **Start the development server:**
```bash
ng serve
```

2. **Open your browser and navigate to:**
```
http://localhost:4200
```

## API Integration

The application is connected to the GPS Gateway API which provides:

### Authentication Endpoints
- `POST /usuarios/login` - User login
- `POST /usuarios/register` - User registration

### User Management
- `GET /usuarios` - Get all users
- `POST /usuarios` - Create user
- `GET /usuarios/:id` - Get user by ID
- `PUT /usuarios/:id` - Update user
- `DELETE /usuarios/:id` - Delete user

### Beneficiary Management
- `GET /beneficiarios` - Get all beneficiaries
- `POST /beneficiarios` - Create beneficiary
- `GET /beneficiarios/:id` - Get beneficiary by ID
- `PUT /beneficiarios/:id` - Update beneficiary
- `DELETE /beneficiarios/:id` - Delete beneficiary

### Inventory Management
- `GET /api/bodegas` - Get all warehouses
- `GET /api/productos` - Get all products
- `GET /api/lotes` - Get all batches

### Sales Management
- `GET /api/sales` - Get all sales transactions
- `POST /api/sales` - Create sales transaction
- `GET /api/sales/date-range` - Get sales by date range

## User Roles and Permissions

The system supports the following roles:
- **admin**: Full system access
- **supervisor**: Management access to all modules
- **buyer**: Purchase transaction access
- **seller**: Sales transaction access
- **user**: Basic user access

## Authentication Flow

1. Users must log in through the `/login` route
2. Upon successful authentication, a JWT token is stored in localStorage
3. The token is automatically included in all API requests via HTTP interceptor
4. Protected routes require authentication via AuthGuard
5. Users can logout, which clears the token and redirects to login

## Project Structure

```
src/
├── app/
│   ├── guards/
│   │   └── auth.guard.ts          # Route protection
│   ├── interceptors/
│   │   └── auth.interceptor.ts    # HTTP request interceptor
│   ├── services/
│   │   ├── auth.service.ts        # Authentication service
│   │   ├── beneficiary.service.ts # Beneficiary management
│   │   ├── inventori.service.ts   # Inventory management
│   │   ├── sales-inventori.service.ts # Sales management
│   │   └── user.service.ts        # User management
│   ├── shared/
│   │   └── components/
│   │       ├── navbard/           # Navigation bar
│   │       ├── user-list/         # User list component
│   │       └── ...
│   └── views/
│       ├── home/                  # Home dashboard
│       ├── login/                 # Login page
│       ├── beneficiarios/         # Beneficiary management
│       ├── registrar-usuarios/    # User registration
│       └── sales/                 # Sales management
├── environments/
│   ├── environment.ts            # Development environment
│   └── environment.prod.ts       # Production environment
```

## Building for Production

1. **Build the application:**
```bash
ng build --prod
```

2. **The build artifacts will be stored in the `dist/` directory**

## Docker Support

The application includes Docker configuration for containerized deployment:

```bash
# Build the Docker image
docker build -t gps-frontend .

# Run the container
docker run -p 80:80 gps-frontend
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: The API gateway should handle CORS, but if you encounter issues, check the API configuration.

2. **Authentication Errors**: 
   - Ensure the JWT token is valid
   - Check that the user has the required roles/permissions
   - Verify the API gateway is accessible

3. **API Connection Issues**:
   - Check the API gateway URL in environment files
   - Verify the gateway is running and accessible
   - Check network connectivity

### Development Tips

- Use browser developer tools to monitor network requests
- Check the console for error messages
- Verify authentication state in localStorage
- Test API endpoints directly using tools like Postman

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

