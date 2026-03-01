# Requerimientos Legales - Chile

## Normativa Aplicable

### 1. Ley N°20.584 (2012)
"Regula los derechos y deberes que tienen las personas en relación con acciones vinculadas a su atención en salud"

**Artículos clave:**
- Art. 12: Derecho a consentimiento informado
- Art. 14: Secreto profesional
- Art. 16: Derecho a acceso de datos personales
- Art. 17: Protección de confidencialidad

**Implicación para Esthetic App:**
- Consentimientos firmados obligatoriamente
- Ficha clínica confidencial
- Acceso limitado por rol
- Derecho de paciente a acceder su historial

### 2. Decreto Supremo N°41 (2012)
"Aprueba Normas de Autorización, Funcionamiento y Supervisión de Establecimientos de Salud Privados"

**Sección de Registros Clínicos:**
- Ficha clínica es obligatoria
- Debe contener datos identificación, diagnóstico, plan
- Debe mantenerse mínimo 5 años
- Responsabilidad de confidencialidad

**Implicación:**
- Sistema debe cumplir requisitos de conservación
- Backup/redundancia por 5 años
- Trazabilidad de accesos

### 3. Ley N°19.628 (1999)
"Protección de Datos de Carácter Personal"

**Obligaciones:**
- Consentimiento para recopilar datos
- Seguridad en almacenamiento
- Derecho a acceso y rectificación
- Prohibición de discriminación

**Implicación:**
- Formulario consentimiento datos personales
- Encriptación de datos
- Mecanismo de rectificación
- No venta a terceros

### 4. CENS (Acreditación de Clínicas)
Sistema voluntario pero recomendado

**Requisitos de Ficha Clínica:**
- Identificación paciente
- Anamnesis
- Examen físico
- Diagnóstico
- Plan de tratamiento
- Consentimiento informado
- Registro de procedimientos realizados
- Evolución clínica

## Implementación en Esthetic App

### 1. Ficha Clínica Electrónica

**Requisitos obligatorios:**

```typescript
interface FichaClinicaElectronica {
  // Identificación
  patient: {
    rut: string;        // Validar RUT chileno
    name: string;
    dob: Date;
    contact: string;
  };

  // Consentimiento informado
  consent: {
    signed: boolean;
    signedAt: Date;
    signedBy: string;    // Firma digital del paciente
    documentUrl: string;
  };

  // Clínica
  clinic: {
    name: string;
    rut: string;        // RUT del establecimiento
    authorization: string;
  };

  // Médico responsable
  professional: {
    rut: string;
    medicalLicense: string;
    name: string;
  };

  // Contenido clínico (los 4 módulos)
  anamnesis: Anamnesis;
  physicalExam: PhysicalExamination;
  diagnosis: Diagnosis;
  treatmentPlan: TreatmentPlan;

  // Procedimientos ejecutados
  sessions: Session[];

  // Evolución
  evolutions: ClinicalEvolution[];

  // Timestamps de trazabilidad
  createdAt: Date;
  updatedAt: Date;
  lastModifiedBy: string;

  // Cumplimiento
  legalCompliance: {
    ds41Compliant: boolean;
    law20584Compliant: boolean;
    law19628Compliant: boolean;
    retentionYears: number;  // Mínimo 5 años
  };
}
```

### 2. Consentimiento Informado

**Plantilla legal (según Ley N°20.584):**

```
CONSENTIMIENTO INFORMADO PARA TRATAMIENTO ESTÉTICO

Yo, _________________________, RUT __________
Confirmo que:

1. He sido informado(a) detalladamente sobre:
   - Mi diagnóstico clínico
   - Los tratamientos propuestos
   - Riesgos y posibles complicaciones
   - Alternativas de tratamiento
   - Resultados esperados

2. He tenido oportunidad de hacer preguntas

3. Autorizo al Dr./Dra. _______________ a realizar
   los procedimientos descritos

4. Entiendo que puedo revocar este consentimiento
   en cualquier momento

Fecha: ___________
Firma paciente: ___________
Firma médico: ___________
```

**En Esthetic App:**
- Generado automáticamente según plan
- Firma digital (DocuSign certificado)
- Almacenamiento seguro con timestamp
- Evidencia legal de consentimiento

### 3. Receta Electrónica MINSAL

**Integración requerida:**

```typescript
// Receta generada automáticamente post-sesión
interface PrescriptionMINSAL {
  id: string;
  patientRut: string;
  patientName: string;
  
  professionalRut: string;
  professionalLicense: string;
  
  clinicRut: string;
  clinicName: string;
  
  medications: Array<{
    code: string;        // Código MINSAL
    name: string;
    dosis: string;
    frequency: string;
    duration: string;
  }>;
  
  observations: string;
  digitalSignature: string;  // Firma electrónica médico
  qrCode: string;           // Para farmacia
  issuedAt: Date;
  expiresAt: Date;
}
```

**API MINSAL:**
- Endpoint: https://recetaelectronica.minsal.cl/api/...
- Autenticación: Certificado digital médico
- Validación: RUT, licencia, observancia ley

### 4. Trazabilidad Legal (Audit Trail)

**Registro obligatorio de:**
- Quién accedió la ficha (usuario, hora, IP)
- Qué datos fueron consultados
- Si fue modificado y por quién
- Cambios realizados (old value → new value)

```typescript
interface AuditLog {
  id: UUID;
  userId: UUID;
  userName: string;
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
  entityType: string;      // 'Patient', 'ClinicalRecord', etc.
  entityId: UUID;
  oldValues: JSON;         // Antes de cambio
  newValues: JSON;         // Después de cambio
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  reason?: string;         // Por qué se modificó
}
```

**Requisitos:**
- No puede ser eliminado
- Almacenado por mínimo 5 años
- Encriptado en reposo
- Acceso restringido a administrador

### 5. Protección de Datos Sensibles

**Según Ley N°19.628:**

```typescript
// Datos que requieren consentimiento especial
const sensitiveData = [
  'biological_sex',
  'date_of_birth',
  'health_information',
  'biometric_data',  // Fotos antes/después
  'behavioral_data'  // Hábitos, etc.
];

// Política: 
// 1. Consentimiento previo del paciente
// 2. Propósito específico y legítimo
// 3. No venta a terceros sin autorización
// 4. Derecho de acceso y rectificación
// 5. Derecho al olvido (bajo ciertos casos)
```

### 6. Seguridad Mínima Requerida

**MINSAL/DS41 exige:**
- Acceso controlado (autenticación)
- Confidencialidad (encriptación)
- Integridad de datos (no manipulables)
- Disponibilidad (backups, 99.9% uptime)
- Recuperación ante desastres

**Implementación Esthetic App:**
- JWT + 2FA para autenticación
- AES-256 encriptación en reposo
- HTTPS/TLS en tránsito
- PostgreSQL ACID compliance
- Backups diarios + redundancia
- DRP (Disaster Recovery Plan)

## Checklist Compliance

```
[ ] Ficha clínica contiene mínimo requerido (DS41)
[ ] Consentimiento informado previo a procedimiento
[ ] Receta electrónica MINSAL integrada
[ ] Audit trail de accesos (trazabilidad)
[ ] Datos encriptados en reposo
[ ] Backup por mínimo 5 años
[ ] Derecho de acceso del paciente funcional
[ ] Derecho de rectificación implementado
[ ] Confidencialidad garantizada
[ ] Acuerdo de privacidad disponible
[ ] Certificación CENS en proceso
[ ] Seguro responsabilidad civil médica
```

## Certificaciones Recomendadas

### ISO 27001
Information Security Management System

### ISO 9001
Quality Management System

### HIPAA (si expansión USA)
Health Insurance Portability and Accountability Act

## Responsabilidad Civil

**La clínica es responsable de:**
- Exactitud de diagnósticos
- Consentimiento válido
- Calibre de procedimientos
- Seguimiento post-tratamiento

**Recomendación:**
- Contrato con compañía seguros
- Cobertura mínima $200K USD
- Revisión legal anual

## Contactos Regulatorios

- **MINSAL:** www.minsal.cl
- **SERNAC:** Derechos del consumidor
- **Colegio Médico:** Validación profesionales
- **Abogado especialista:** Salud digital + LATAM

## Próximas Actualizaciones

- Nueva Ley de Habeas Data (proyecto)
- Estándares ISO para software médico
- Integración con sistemas públicos (si aplica)
