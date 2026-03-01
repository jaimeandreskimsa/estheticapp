FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache python3 make g++ cairo-dev jpeg-dev pango-dev giflib-dev pixman-dev

# Copiar package files
COPY package*.json ./

# Instalar todas las dependencias (incluidas devDependencies para compilar)
RUN npm install

# Copiar código fuente
COPY src ./src
COPY tsconfig.json ./

# Compilar TypeScript
RUN npm run build

# Eliminar devDependencies después de compilar
RUN npm prune --production

# Exponer puerto (Railway inyecta PORT automáticamente)
EXPOSE 8000

# Health check usando la variable PORT de Railway
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT||8000) + '/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Iniciar aplicación
CMD ["npm", "start"]
