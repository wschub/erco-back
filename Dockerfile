FROM node:21-alpine

# Crear el directorio de la aplicación
WORKDIR /app

# Copiar solo package.json y yarn.lock (mejor caché)
COPY package.json ./

# Instalar dependencias
RUN yarn config set "strict-ssl" false && yarn install

# Copiar el resto de la aplicación
COPY . .

# Ejecutar Prisma
RUN npx prisma generate && npx prisma db push

# Construir la aplicación
RUN yarn build

# Exponer el puerto (ajusta si usas otro)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["yarn", "start"]
