# Guía de Desarrollo

## Ambiente Local

### Requisitos
- Node.js 18+
- Docker y Docker Compose
- Git

### Setup Inicial

```bash
# 1. Clonar y navegar
git clone <repo>
cd estheticapp

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Instalar dependencias
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# 4. Iniciar servicios
docker-compose up -d

# 5. Esperar a que DB esté lista (≈30s)
sleep 30

# 6. Ejecutar migraciones
docker exec esthetic_backend npm run migrate

# 7. Seed de datos iniciales
docker exec -it esthetic_postgres psql -U esthetic_user -d esthetic_db -f /docker-entrypoint-initdb.d/seed.sql
```

### URLs
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Docs:** http://localhost:3001/api-docs
- **pgAdmin:** http://localhost:5050 (admin@esthetic.local / admin_dev)
- **Redis Commander:** http://localhost:8081

## Estructura de Carpetas

```
backend/
├── src/
│   ├── routes/        # Rutas de la API
│   ├── models/        # Entidades TypeORM
│   ├── services/      # Lógica de negocio
│   ├── middlewares/   # Middlewares Express
│   ├── ai/            # Servicios IA (OpenAI, Whisper, etc)
│   ├── utils/         # Utilitarios
│   └── index.ts       # Punto de entrada
├── database/          # Migraciones TypeORM
└── package.json

frontend/
├── src/
│   ├── pages/         # Páginas principales
│   ├── components/    # Componentes reutilizables
│   ├── hooks/         # Custom React Hooks
│   ├── services/      # Clientes API
│   ├── styles/        # CSS global
│   ├── App.tsx        # Router principal
│   └── main.tsx       # Entry point
└── package.json
```

## Flujos de Desarrollo

### Feature Development
1. Crear rama feature: `git checkout -b feature/nombre`
2. Backend:
   - Crear modelos en `src/models/`
   - Crear servicios en `src/services/`
   - Crear rutas en `src/routes/`
3. Frontend:
   - Crear páginas/componentes
   - Integrar con servicios API
4. Commit y PR

### Testing
```bash
# Backend
cd backend && npm run test

# Frontend
cd frontend && npm run test
```

### Build & Deploy
```bash
# Producción
npm run build

# Docker
docker-compose -f docker-compose.prod.yml up
```

## API Reference

### Autenticación
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/verify

Header: Authorization: Bearer <token>
```

### Pacientes
```
GET    /api/patients
GET    /api/patients/:id
POST   /api/patients
PUT    /api/patients/:id
DELETE /api/patients/:id
```

### Consultas (Full Chain)
```
POST   /api/consultas                    # Nueva consulta
POST   /api/consultas/:id/diagnostico   # Generar diagnóstico (IA)
POST   /api/consultas/:id/plan          # Crear plan
POST   /api/consultas/:id/presupuesto   # Generar presupuesto
POST   /api/consultas/:id/consentimientos # Crear consentimientos
POST   /api/consultas/:id/sesion        # Crear sesión
```

### Sesiones (Ejecución)
```
POST   /api/sesiones/:id/procedimiento  # Registrar procedimiento
POST   /api/sesiones/:id/foto           # Subir foto
POST   /api/sesiones/:id/completar      # Completar sesión
```

## IA Services

### Integración OpenAI

```typescript
// backend/src/ai/openai.ts
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Diagnóstico
const diagnosis = await openai.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: [...]
})

// Vision (análisis de fotos)
const visionAnalysis = await openai.chat.completions.create({
  model: 'gpt-4-vision-preview',
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'Analiza esta foto clínica...' },
      { type: 'image_url', image_url: { url: photoUrl } }
    ]
  }]
})
```

## Mejores Prácticas

### Backend
- Validar inputs con class-validator
- Usar transacciones para operaciones críticas
- Logging estructurado con pino
- Error handling consistente
- Variables de entorno para configuración

### Frontend
- Componentes funcionales con React Hooks
- React Query para state management de datos remotos
- Zustand para estado local
- TypeScript stricto
- Componentes reutilizables

## Troubleshooting

### Base de datos no conecta
```bash
# Ver logs de postgres
docker-compose logs postgres

# Reiniciar servicios
docker-compose restart
```

### Puerto en uso
```bash
# Cambiar en docker-compose.yml o .env
lsof -i :3000  # Encontrar proceso
kill -9 <PID>
```

### Tokens expirados
```bash
# Redis caché está lleno
docker exec esthetic_redis redis-cli FLUSHALL
```

## Próximas Integraciones

- [ ] Receta electrónica MINSAL
- [ ] Firma digital (DocuSign/Adobe)
- [ ] Pasarela de pagos (Stripe/Webpay)
- [ ] WhatsApp API
- [ ] S3 para almacenamiento de fotos
- [ ] Analytics (Mixpanel/Amplitude)
