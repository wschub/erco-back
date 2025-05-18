import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Erco',
      version: '1.0',
      description: 'Marketplace para la compra y venta de energía',
    },
    servers: [
      {
        url: process.env.URL, // Cambia esto si estás en producción
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['full_name', 'surname', 'email', 'password', 'role'],
          properties: {
            full_name: { type: 'string' },
            surname: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            role: { type: 'string' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Ajusta el path según tu estructura
};

export const swaggerSpec = swaggerJsdoc(options);
