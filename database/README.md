# Database Migrations y Seeds

## Archivos

- **schema.sql** - Esquema completo de base de datos (tables, indexes)
- **seeds/initial_data.sql** - Datos iniciales para desarrollo
- **migrations/** - Migraciones incrementales (próximas)

## Entidades Principales

### Core
- **Users** - Profesionales médicos (doctores, especialistas)
- **Clinics** - Clínicas / Centros estéticos
- **Patients** - Pacientes

### Clínica
- **Clinical Records** - Fichas clínicas (referencia a 4 módulos)
- **Anamnesis** - Historial médico/estético
- **Physical Examinations** - Evaluación física
- **Diagnoses** - Diagnósticos (generados por IA)
- **Treatment Plans** - Planes de tratamiento
- **Consents** - Consentimientos digitales
- **Sessions** - Sesiones de tratamiento
- **Clinical Evolutions** - Seguimiento/control

### Administrativo
- **Budgets** - Presupuestos automáticos
- **Payments** - Pagos y cobranzas
- **Products** - Inventario de productos
- **Product Lots** - Control de lotes/vencimientos
- **Audit Logs** - Trazabilidad legal

## Relaciones Key

```
Clinic
├── Users (doctores)
├── Patients
│   ├── Clinical Records
│   │   ├── Anamnesis
│   │   ├── Physical Exams
│   │   ├── Diagnoses
│   │   ├── Treatment Plans
│   │   │   ├── Treatment Items (Procedimientos)
│   │   │   └── Budget
│   │   ├── Consents
│   │   ├── Sessions
│   │   │   └── Session Procedures
│   │   └── Clinical Evolutions
│   └── Clinical Photos
├── Products
│   └── Product Lots
└── Payments
```

## Ejecución

```bash
# Con Docker (automático)
docker-compose up

# Manual con PostgreSQL local
psql -U esthetic_user -d esthetic_db < schema.sql
psql -U esthetic_user -d esthetic_db < seeds/initial_data.sql
```
