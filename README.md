# erco-back

## Arquitectura Propuesta

- **Arquitectura:** MVC + Event-driven (WebSockets) + principios de Clean Architecture  
- **Frontend:** React.JS  
- **Backend / API:** Node.js + Express + TypeScript  
- **WebSockets:** `socket.io` integrado en Express  
- **Autenticación:** JWT con middleware en Express  
- **ORM:** Prisma ORM  
- **Base de datos:** PostgreSQL  
- **Persistencia y expiración:** PostgreSQL + cron jobs o TTL vía backend  
- **Documentación API:** Swagger con `swagger-jsdoc`

## Explicación

- **Autenticación : JWT + Middleware Express :** Es la estrategia de autenticación más básica y sencilla, además de ser la sugerida.
- **ORM : Prisma:** 	Tipado fuerte, migraciones fáciles, integración fluida con PostgreSQL y ofrece una capa extra de validacieon y seguridad
- **Concurrencia : Transacciones en Prisma + bloqueo lógico:** 	Para asegurar que una oferta no sea comprada dos veces
- **Comunicación en tiempo real : socket.io:** Amplio soporte y fácil de integrar en Node.js, haciendo posible la concurrencia y la comunicación doble vía.
- **Vencimiento de ofertas : Comparación de Date.now() con end_time + setInterval() o cron job para invalidar :** Cambiar los estados de las ofertas de manera automatizada.
- **Integridad y persistencia : Uso de transacciones en Prisma:** Evita estados intermedios en compras



---

## Variables de entorno `.env`

```env
DATABASE_URL="postgresql://postgres:''@localhost:5432/erco_market?schema=public"
JWT_SECRET=""
PORT=4000
URL=http://localhost:4000
```
---

## Comandos para instalación:
npm install
npm run buld 
npm run dev
npm run postinstall
npx prisma generate #si lo requiere

## Instrucciones de uso:
ruta documentación:
(http://localhost:4000/docs)

1. Registrarse, role al momento de crear el usuario:
admin | buyer | seller

2. Una vez registrado se autentica con el servicio login mediante email y password y con este token obtenido accede a los servicios.

En ofertas y transacciones tienen restricción para cceder según el rol.

## Front End
Repo: (https://github.com/wschub/erco-front)

```env
VITE_URL_SERVICE=http://localhost:4000
```
