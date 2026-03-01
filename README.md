# Esthetic App - Ficha Clínica Electrónica para Medicina Estética

Sistema best-in-class de ficha clínica electrónica para medicina estética, con automatización IA, cumplimiento legal (Chile) y experiencia clínica optimizada.

## Estructura del Proyecto

```
estheticapp/
├── backend/           # API REST + Servicios IA
├── frontend/          # Aplicación React
├── database/          # Esquemas y migraciones
├── docs/              # Documentación
└── docker-compose.yml # Orquestación
```

## Stack Tecnológico

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **BD:** PostgreSQL + Redis
- **ORM:** TypeORM
- **IA:** OpenAI GPT-4, Whisper, Vision API
- **Autenticación:** JWT + 2FA
- **Testing:** Jest + Supertest

### Frontend
- **Framework:** React 18 + TypeScript
- **UI:** Tailwind CSS + Shadcn UI
- **Estado:** TanStack Query + Zustand
- **Formularios:** React Hook Form + Zod
- **Gráficos:** Chart.js + D3.js

### Infraestructura
- **Contenedores:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Cloud:** AWS (S3, RDS, Lambda)
- **Firma digital:** Integración DocuSign

## Quick Start

### Requisitos Previos
- Node.js 18+
- Docker y Docker Compose
- PostgreSQL 14+
- Redis 7+

### Instalación Local

```bash
# Clonar repositorio
git clone <repo> estheticapp
cd estheticapp

# Instalar dependencias
cd backend && npm install
cd ../frontend && npm install

# Configurar variables de entorno
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Iniciar servicios con Docker
docker-compose up -d

# Ejecutar migraciones
npm run migrate

# Iniciar desarrollo
npm run dev
```

### URLs de Desarrollo
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8000
- **API Docs:** http://localhost:8000/api-docs
- **pgAdmin:** http://localhost:5050
- **Redis Commander:** http://localhost:8081

## Módulos Principales

1. **Pacientes** - Gestión de datos demográficos y médicos
2. **Consultas** - Motivo, anamnesis, expectativas
3. **Diagnóstico** - Generación IA de diagnóstico clínico
4. **Plan de Tratamiento** - Diseño de plan con IA
5. **Presupuesto** - Generación automática
6. **Consentimientos** - Firma digital
7. **Sesiones** - Ejecución y trazabilidad
8. **Evolución** - Controles y seguimiento
9. **Historial** - Resumen visual consolidado

## Características Principales

✅ Ficha clínica completa con 4 módulos conectados
✅ Generación automática de diagnósticos con IA
✅ Presupuestos automáticos
✅ Transcripción de voz (Whisper)
✅ OCR para lotes/vencimientos
✅ Firma digital de consentimientos
✅ Trazabilidad legal (decreto DS41)
✅ Portal paciente
✅ Integración MINSAL (recetas)
✅ Control de inventario en tiempo real

## Documentación

- [Arquitectura](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Requerimientos Legales](docs/LEGAL.md)
- [Guía de Desarrollo](docs/DEVELOPMENT.md)

## Roadmap MVP

**Fase 1 (Semanas 1-4):**
- Setup infraestructura
- Modelos base de datos
- API autenticación
- CRUD pacientes

**Fase 2 (Semanas 5-8):**
- Módulo consulta
- Diagnóstico IA
- Frontend pantallas clave

**Fase 3 (Semanas 9-12):**
- Plan y presupuesto
- Sesiones
- Firma digital

**Fase 4 (Semanas 13-16):**
- Portal paciente
- Historial
- Testing y optimización

## Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para guidelines.

## Licencia

Propietario - Esthetic App 2026

## Contacto

Para consultas: dev@estheticapp.com
