# API Gateway

Public entry point for the Order Platform.

Current responsibilities:

- Global API prefix and versioning
- Environment configuration validation
- Security headers
- CORS
- Request validation
- Swagger documentation
- Health check

Future responsibilities:

- Route requests to internal services
- JWT authentication and role authorization
- Rate limiting
- Correlation IDs and distributed tracing
- Consistent gateway error responses

## Development

Requires Node.js 22.13 or newer. Node.js 24 LTS is recommended.

```bash
npm install
copy .env.example .env
npm run start:dev
```

The gateway runs at `http://localhost:3000`.
