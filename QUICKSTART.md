# INICIO RÁPIDO

El sistema **Esthetic App** ha sido creado completamente. Aquí está todo lo que necesitas saber para comenzar.

## ✅ Lo que se ha creado

### 1. **Estructura Completa del Proyecto**
```
estheticapp/
├── backend/              # API REST (Express.js + TypeScript)
├── frontend/             # UI (React + TypeScript + Tailwind)
├── database/             # Esquema SQL + seeds
├── docs/                 # Documentación técnica y legal
├── docker-compose.yml    # Orquestación de servicios
└── README.md             # Documentación principal
```

### 2. **Backend Stack**
- **Express.js** para API REST
- **TypeScript** para type safety
- **PostgreSQL** para BD principal
- **Redis** para cache
- Rutas base para: Auth, Pacientes, Consultas, Diagnóstico, Plan, Presupuesto, Sesiones

### 3. **Frontend Stack**
- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **React Query** para datos remotos
- Componentes base: Sidebar, Header, Dashboard, Pacientes
- Páginas placeholder para todos los módulos

### 4. **Base de Datos**
- Esquema completo SQL con 20+ tablas
- Relaciones entre Pacientes, Consultas, Diagnósticos, Plans, Sesiones
- Tablas para trazabilidad legal (Audit Logs)
- Índices optimizados
- Data inicial (seeds) para desarrollo

### 5. **Documentación**
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Arquitectura técnica
- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) - Guía de desarrollo
- [docs/LEGAL.md](docs/LEGAL.md) - Compliance chile (Ley 20.584, DS41, etc)

---

## 🚀 Próximos Pasos

### Paso 1: Instalar Node.js y Docker
```bash
# Verificar que tienes:
node --version    # 18+
npm --version
docker --version
docker-compose --version
```

### Paso 2: Instalar dependencias locales (opcional, Docker también)
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Paso 3: Configurar variables de entorno
```bash
# Copiar template
cp .env.example .env

# Editar .env y agregar:
OPENAI_API_KEY=sk-...  # Tu API key de OpenAI (para IA)
```

### Paso 4: Iniciar con Docker Compose
```bash
docker-compose up -d

# Esperar ≈30 segundos mientras se inicializan servicios
# Luego:
docker-compose logs -f
```

### Paso 5: Acceder a las aplicaciones
| Servicio | URL | Credenciales |
|----------|-----|--------------|
| Frontend | http://localhost:3000 | - |
| Backend API | http://localhost:8000 | - |
| API Docs | http://localhost:8000/api-docs | - |
| pgAdmin | http://localhost:5050 | admin@esthetic.local / admin_dev |
| Redis | http://localhost:8081 | - |

---

## 📋 Estructura Lógica del Sistema

### Los 4 Módulos Principales (Full Chain)

```
CONSULTA → DIAGNÓSTICO → PLAN → PRESUPUESTO
   ↓           ↓           ↓         ↓
Motivo      IA genera    IA       Automático
Anamnesis   diagnóstico  sugiere  + Cálculo
Eval física              tratamiento   margen
Fotos       Editable     Editable  ¿Acepta?
            por médico   por médico
                                    ↓
                              CONSENTIMIENTOS
                                    ↓
                                SESIONES
                                    ↓
                               EVOLUCIÓN
                                    ↓
                              HISTORIAL
```

### Endpoints Principales

**Autenticación:**
```
POST /api/auth/login
POST /api/auth/register
```

**Pacientes (CRUD):**
```
GET    /api/patients
GET    /api/patients/:id
POST   /api/patients
PUT    /api/patients/:id
```

**Full Chain (Consulta → Presupuesto):**
```
POST   /api/consultas                    # Nueva consulta
POST   /api/diagnostico/generate         # IA genera diagnóstico
POST   /api/plan                         # Crear plan
POST   /api/presupuesto/generate         # IA genera presupuesto
```

**Sesiones (Ejecución):**
```
POST   /api/sesiones                     # Nueva sesión
POST   /api/sesiones/:id/foto           # Subir foto clínica
POST   /api/sesiones/:id/procedimiento  # Registrar procedimiento
```

---

## 🎯 Qué Implementar Ahora (Roadmap MVP)

### Fase 1: Autenticación + CRUD Base (Semanas 1-2)
- [ ] Login/Register funcional
- [ ] JWT tokens
- [ ] CRUD Pacientes
- [ ] Dashboard básico
- [ ] Tests para APIs críticas

### Fase 2: Módulo Consulta + IA (Semanas 3-4)
- [ ] Captura de voz (Whisper API)
- [ ] Transcripción automática
- [ ] Anamnesis + checkboxes
- [ ] Evaluación física (mapa corporal)
- [ ] Fotos clínicas (cámara)
- [ ] Validación expectativas

### Fase 3: Diagnóstico + Plan (Semanas 5-6)
- [ ] IA genera diagnóstico (GPT-4)
- [ ] Resumen visual central
- [ ] Vista paciente (simplificada)
- [ ] Plan de tratamiento (wizard)
- [ ] IA sugiere procedimientos
- [ ] Timeline visual

### Fase 4: Presupuesto + Consentimientos (Semanas 7-8)
- [ ] Generación automática presupuesto
- [ ] Items desglosados
- [ ] Margen profesional (vista privada)
- [ ] Consentimientos autogenerados
- [ ] Firma digital (DocuSign o simple)
- [ ] Validación aceptación

### Fase 5: Sesiones + Trazabilidad (Semanas 9-10)
- [ ] Interfaz sesión (mobile-first)
- [ ] OCR lote/vencimiento
- [ ] Registro procedimientos
- [ ] Fotos antes/después
- [ ] Descuento automático inventario
- [ ] Indicaciones post-tratamiento

### Fase 6: Historial + Evolución (Semanas 11-12)
- [ ] Timeline consolidado
- [ ] Resumen ejecutivo (IA)
- [ ] Portal paciente
- [ ] Controles/evolución
- [ ] Exportar PDF
- [ ] Receta electrónica MINSAL

---

## 🛠️ Desarrollo Local

### Editar el código (se recarga automático)

**Backend:**
```bash
cd backend
npm run dev      # Inicia en modo watch
```

**Frontend:**
```bash
cd frontend
npm run dev      # Vite dev server
```

### Testing
```bash
cd backend && npm run test
cd frontend && npm run test
```

### Linting & Formatting
```bash
npm run lint
npm run format
```

---

## 📚 Documentación Técnica

**Lee primero:**
1. [README.md](README.md) - Overview del proyecto
2. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Cómo está estructurado
3. [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) - Cómo desarrollar
4. [docs/LEGAL.md](docs/LEGAL.md) - Requerimientos Chile

---

## ⚠️ Consideraciones Importantes

### Seguridad
- Este es código MVP - **NO usar en producción sin auditoría**
- Cambiar JWT_SECRET en .env
- Cambiar contraseñas de BD
- Habilitar HTTPS en producción
- Configurar CORS según dominio real

### IA (OpenAI)
- Necesitas API key de OpenAI ($$ por uso)
- Prompts están en `backend/src/ai/`
- Puedes customizar según necesidad

### Base de Datos
- PostgreSQL debe estar accesible
- Backups diarios obligatorio
- Retención mínima 5 años (legal Chile)

### Compliance Legal
- Se requiere consentimiento informado previo
- Receta electrónica MINSAL (en integration future)
- Firma digital para consentimientos
- Audit trail de accesos (está en BD)
- Ver [docs/LEGAL.md](docs/LEGAL.md) para checklist completo

---

## 🐛 Troubleshooting

### Docker no inicia
```bash
# Ver logs
docker-compose logs postgres

# Reiniciar
docker-compose down
docker-compose up -d
```

### Port 3000 o 3001 en uso
```bash
# Cambiar en docker-compose.yml o .env
# Luego: docker-compose restart
```

### BD no conecta
```bash
# Esperar que PostgreSQL esté listo
docker-compose ps

# Si está "unhealthy", reiniciar:
docker-compose restart postgres
```

### Limpiar todo y empezar
```bash
docker-compose down -v  # Elimina volúmenes
docker-compose up -d    # Inicia fresh
```

---

## 📞 Contacto & Soporte

- **Documentación técnica:** Ver carpeta `/docs`
- **Issues:** Crear en GitHub/GitLab
- **Preguntas legales:** Consultar abogado especialista en salud digital
- **IA/OpenAI:** Ver [docs/DEVELOPMENT.md - IA Services]

---

## 📈 Siguiente: Desarrollar Módulos

Ahora que tienes la base, el trabajo es:

1. **Conectar IA (OpenAI)** para diagnósticos y sugerencias
2. **Implementar wizards** para consulta y plan
3. **Crear modelos TypeORM** para las entidades
4. **Desarrollar servicios** con lógica de negocio
5. **Implementar firma digital** para consentimientos
6. **Integrar MINSAL** para recetas
7. **Testing e iteración** con feedback médico

---

## 🎓 Aprendizaje Rápido

### Para Backend
- Express.js: https://expressjs.com/
- TypeORM: https://typeorm.io/
- OpenAI API: https://platform.openai.com/docs/

### Para Frontend
- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Tailwind CSS: https://tailwindcss.com/

### Para DevOps
- Docker: https://docs.docker.com/
- PostgreSQL: https://www.postgresql.org/docs/

---

**¡Adelante con el proyecto! 🚀**
