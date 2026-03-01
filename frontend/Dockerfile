FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# VITE_API_URL se pasa como build arg desde Railway
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

# Railway inyecta PORT automáticamente
EXPOSE 3000

CMD ["sh", "-c", "serve -s dist -l ${PORT:-3000}"]
