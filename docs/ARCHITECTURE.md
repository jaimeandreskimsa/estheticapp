# Arquitectura del Sistema

## Overview

Esthetic App es un sistema SaaS de ficha clínica electrónica para medicina estética con:
- **4 módulos conectados:** Diagnóstico → Plan → Presupuesto → Historial
- **IA integrada** para diagnósticos y sugerencias
- **Compliance legal** para Chile (MINSAL, DS41)
- **UX optimizada** para médicos y pacientes

## Capas de Arquitectura

```
┌─────────────────────────────────────────────────────┐
│  PRESENTACIÓN (React SPA)                            │
│  - Dashboard médico                                 │
│  - Flujo guiado (wizard)                            │
│  - Portal paciente                                  │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  API REST (Express.js)                               │
│  - Autenticación (JWT)                              │
│  - Rate limiting                                    │
│  - Validación                                       │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  SERVICIOS DE NEGOCIO                                │
│  ├── Pacientes                                       │
│  ├── Consultas (voz, anamnesis)                      │
│  ├── IA (diagnósticos, sugerencias)                  │
│  ├── Presupuestos (automáticos)                      │
│  ├── Sesiones (trazabilidad)                         │
│  └── Documentos (consentimientos)                    │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│  ALMACENAMIENTO                                      │
│  ├── PostgreSQL (datos estructurados)                │
│  ├── Redis (cache + sesiones)                        │
│  ├── S3 (fotos, documentos)                          │
│  └── ElasticSearch (búsqueda + auditoría)            │
└─────────────────────────────────────────────────────┘
```

## Módulos Principales

### 1. Módulo de Consulta
**Input:** Paciente llega, captura datos simples
**Output:** Datos estructurados (voz → texto, checkboxes, fotos)

Flujo:
- Identificación paciente (autocompletado desde agenda)
- Motivo de consulta (texto + voz)
- Anamnesis (checkboxes + IA sugiere preguntas)
- Evaluación física (mapa corporal interactivo)
- Fotos clínicas (capturas estandarizadas)

**IA aquí:**
- Transcripción voz → texto (Whisper)
- Autocompletado de preguntas anamnesis
- Evaluación automática de expectativas

### 2. Módulo de Diagnóstico
**Input:** Todo lo del módulo anterior
**Output:** Diagnóstico clínico + Resumen Visual

IA genera:
- Diagnóstico clínico profesional (párrafo)
- Resumen simple para paciente (lenguaje accesible)
- Imagen visual con zonas marcadas
- Editable por médico (nunca impositivo)

**Guardar en BD:**
- Texto diagnóstico
- Versión paciente
- URL imagen visual
- Flag: ¿editado manualmente?

### 3. Módulo de Plan
**Input:** Diagnóstico
**Output:** Plan estructurado + Visual

IA asiste:
- Sugerir procedimientos según diagnóstico
- Calcular cantidades (ml/unidades)
- Orden de procedimientos
- Validar contraindicaciones

**Guardar:**
- Array de procedimientos ordenados
- Cantidades por procedimiento
- Timeline estimado
- Imagen visual del plan

### 4. Módulo de Presupuesto
**Input:** Plan + Productos (con costos)
**Output:** Presupuesto automático

Lógica:
- Por cada procedimiento del plan
- Buscar producto + precio
- Calcular cantidad total
- Sumar sesiones
- Total paciente + Margen profesional

**Guardar:**
- Items desglosados
- Total paciente (versión simplificada)
- Total cost + margin (vista profesional)
- Estado: pending/accepted/rejected

### 5. Módulos Secundarios

**Consentimientos:**
- Generados automáticamente según plan aceptado
- Firmables digitalmente (DocuSign)
- Validación legal

**Sesiones:**
- Ejecución en tablet/móvil
- OCR de lotes/vencimientos
- Registro de productos utilizados
- Fotos antes/después
- Trazabilidad completa

**Evolución:**
- Controles post-procedimiento
- Comparación de fotos
- Seguimiento del plan
- Decisiones clínicas

**Historial:**
- Timeline consolidado
- Resumen ejecutivo (IA)
- Acceso paciente + profesional
- Exportable (PDF, receta)

## Flujo de Datos

```
INGRESO
Patient Data → Anamnesis → Eval Física → Fotos
      ↓              ↓            ↓        ↓
      └──────────────┬────────────┴────────┘
                     ↓
            DIAGNÓSTICO (IA)
                     ↓
            PLAN (IA + médico)
                     ↓
            PRESUPUESTO (automático)
                     ↓
            ¿ACEPTADO?
            ↙           ↘
          NO           SÍ
          ↓             ↓
        FIN      CONSENTIMIENTOS
                 ↓
                SESIONES (1..N)
                 ↓
               EVOLUCIÓN
                 ↓
              HISTORIAL
```

## Decisiones Arquitectónicas

### 1. Monorepo vs. Polirepo
**Decisión:** Monorepo (backend + frontend en mismo repo)
**Razón:** Más fácil para MVP, facilita sincronización

### 2. BD: PostgreSQL + MongoDB
**Decisión:** PostgreSQL principal + Redis cache
**Razón:** Datos estructurados, transacciones, compliance legal

### 3. IA: OpenAI API
**Decisión:** API cloud (no fine-tuning inicial)
**Razón:** Speed to market, costo variable, escalable
**Futuro:** Fine-tuning con corpus médico estético

### 4. Frontend: React SPA
**Decisión:** React + TypeScript + Vite
**Razón:** Industria estándar, comunidad grande, performance

### 5. Autenticación: JWT + 2FA
**Decisión:** JWT bearer tokens + SMS 2FA
**Razón:** Compliance regulatorio (datos sensibles)

## Seguridad

### Niveles de Acceso
```
Admin (Clínica)
├── Ver toda la data
├── Gestionar usuarios
├── Configurar productos
└── Ver reportes financieros

Médico/Doctor
├── Crear consultas de sus pacientes
├── Generar diagnósticos/planes
├── Ejecutar sesiones
└── Ver historial

Paciente
├── Ver diagnóstico (simplificado)
├── Ver plan (sin costos internos)
├── Firmar consentimientos
├── Ver mis fotos
└── Descargar documentos
```

### Data Protection
- Encriptación en tránsito (HTTPS/TLS)
- Encriptación en reposo (BD + S3)
- Tokenización de datos sensibles
- GDPR + Ley 19.628 (Chile)
- Audit logs inmutables

## Performance

### Optimizaciones
- **Frontend:** Lazy loading, code splitting, image optimization
- **Backend:** Database indexes, query optimization, caching
- **IA:** Async processing, queue system para diagnósticos

### Capacidad Estimada
- 10K pacientes activos
- 100K consultas/año
- 1M fotos almacenadas
- Sub-segundo para queries principales

## Escalabilidad

### Horizontal
- Stateless API (puede replicarse)
- Cache distribuido (Redis)
- Load balancer (NGINX)

### Vertical
- BD: Read replicas para reportes
- CDN: Para fotos clínicas
- Queue: Celery/Bull para procesamiento async

## Monitoreo

- **Logs:** Centralizados (ELK stack)
- **Métricas:** Prometheus + Grafana
- **Alertas:** PagerDuty para críticos
- **APM:** DataDog / NewRelic

## Roadmap Futuro

**V1.1:**
- Receta electrónica MINSAL integrada
- Firma digital (DocuSign)
- WhatsApp notificaciones

**V1.2:**
- Fine-tuning IA con corpus médico estético
- Predicción de complicaciones (ML)
- Análisis de satisfacción paciente

**V1.3:**
- Múltiples clínicas en una cuenta
- Reportes avanzados
- Integraciones con sistemas de pago

**V2.0:**
- Escalar a otras especialidades médicas
- Mobile app native
- Telemedicina integrada
