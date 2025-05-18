import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Erco Energy',
      version: '1.0',
      description: 'Marketplace para la compra y venta de energía',
    },
    servers: [
      {
        url: process.env.URL || 'http://localhost:3000',
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
            role: { type: 'string', enum: ['admin', 'seller', 'buyer'] },
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
        Offer: {
          type: 'object',
          required: ['qtykwh', 'priceKwh', 'startTime', 'endTime', 'status'],
          properties: {
            qtykwh: { type: 'number' },
            priceKwh: { type: 'number' },
            startTime: { type: 'string', format: 'date-time' },
            endTime: { type: 'string', format: 'date-time' },
            status: { type: 'string', enum: ['available', 'sold'] },
          },
        },
        Transaction: {
          type: 'object',
          required: ['offerId', 'amount'],
          properties: {
            offerId: { type: 'string' },
            amount: { type: 'number' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      '/api/offers': {
        post: {
          tags: ['Offers'],
          summary: 'Crear una nueva oferta',
          description: 'Acceso solo para usuarios con rol **seller**',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Offer' },
              },
            },
          },
          responses: {
            201: { description: 'Oferta creada' },
            403: { description: 'Acceso denegado (solo seller)' },
          },
        },
        get: {
          tags: ['Offers'],
          summary: 'Listar todas las ofertas',
          description: 'Acceso solo para usuarios con rol **admin**',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Lista de ofertas',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Offer' },
                  },
                },
              },
            },
            403: { description: 'Acceso denegado (solo admin)' },
          },
        },
      },
      '/api/offers/{id}': {
        get: {
          tags: ['Offers'],
          summary: 'Obtener oferta por ID',
          description: 'Acceso para usuarios con rol **buyer** o **seller**',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'ID de la oferta',
            },
          ],
          responses: {
            200: {
              description: 'Oferta encontrada',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Offer' },
                },
              },
            },
            403: { description: 'Acceso denegado' },
            404: { description: 'Oferta no encontrada' },
          },
        },
        put: {
          tags: ['Offers'],
          summary: 'Actualizar una oferta',
          description: 'Acceso solo para usuarios con rol **seller**',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'ID de la oferta',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    qtykwh: { type: 'number' },
                    priceKwh: { type: 'number' },
                    startTime: { type: 'string', format: 'date-time' },
                    endTime: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Oferta actualizada' },
            403: { description: 'Acceso denegado (solo seller)' },
          },
        },
        delete: {
          tags: ['Offers'],
          summary: 'Eliminar una oferta',
          description: 'Acceso solo para usuarios con rol **seller**',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string' },
              description: 'ID de la oferta',
            },
          ],
          responses: {
            200: { description: 'Oferta eliminada' },
            403: { description: 'Acceso denegado (solo seller)' },
          },
        },
      },
      '/api/transactions': {
        post: {
          tags: ['Transactions'],
          summary: 'Crear una nueva transacción',
          description: 'Acceso solo para usuarios con rol **buyer**',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Transaction' },
              },
            },
          },
          responses: {
            201: { description: 'Transacción creada' },
            403: { description: 'Acceso denegado (solo buyer)' },
          },
        },
        get: {
          tags: ['Transactions'],
          summary: 'Obtener todas las transacciones',
          description: 'Acceso para usuarios con rol **admin**, **buyer** o **seller**',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Lista de transacciones',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Transaction' },
                  },
                },
              },
            },
            403: { description: 'Acceso denegado' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
