# Roadmap de Implementación - Sistema de Gestión Escolar

## Fase 1: Fundamentos ✅ (Completada)

### 1.1 Autenticación y Seguridad
- [x] Módulo de Roles
- [x] Módulo de Usuarios (Users)
- [x] Sistema de Autenticación (JWT + Refresh Tokens)
- [x] Cookies HttpOnly para tokens
- [x] Guards globales con decorador `@Public()`
- [x] Estrategia JWT (Passport)

---

## Fase 2: Datos Personales y Geográficos 🎯 (Siguiente)

### 2.1 Información Geográfica
- [ ] **States** (Estados)
  - Entity, Service, Resolver
  - CRUD básico
  - Seed con estados de México

- [ ] **Municipalities** (Municipios)
  - Entity, Service, Resolver
  - Relación con States
  - CRUD básico

### 2.2 Direcciones
- [ ] **Addresses** (Direcciones)
  - Entity con relaciones a States y Municipalities
  - Service y Resolver
  - Validaciones de códigos postales

### 2.3 Personas
- [ ] **Persons** (Personas)
  - Entity con relación 1:1 a Users
  - Campos: CURP, nombre, apellidos, fecha nacimiento, teléfonos
  - Relación con Addresses
  - Contacto de emergencia
  - Service y Resolver con CRUD completo

---

## Fase 3: Estructura Académica

### 3.1 Especialidades y Materias
- [ ] **Specialties** (Especialidades/Carreras)
  - Entity, Service, Resolver
  - Código y descripción

- [ ] **Subjects** (Materias)
  - Entity con horas teóricas/prácticas
  - Créditos
  - Service y Resolver

- [ ] **StudyPlans** (Planes de Estudio)
  - Relación Specialty-Subject
  - Semestre y currículo
  - Materias obligatorias/optativas

### 3.2 Periodos y Grupos
- [ ] **AcademicPeriods** (Periodos Académicos)
  - Entity con fechas inicio/fin
  - Periodo activo
  - Service y Resolver

- [ ] **Groups** (Grupos)
  - Entity con turno, semestre, especialidad
  - Capacidad máxima
  - Relación con AcademicPeriods
  - Service y Resolver

---

## Fase 4: Actores Principales

### 4.1 Estudiantes
- [ ] **Students** (Estudiantes)
  - Entity con relación 1:1 a Persons
  - Número de control
  - Estado (Activo, Inactivo, Egresado, Baja)
  - GPA de secundaria, escuela previa
  - Relación con Groups
  - Service y Resolver con CRUD completo

### 4.2 Profesores
- [ ] **Teachers** (Profesores)
  - Entity con relación 1:1 a Persons
  - Número de empleado
  - Grado académico
  - Especialidad
  - Estado y fecha de contratación
  - Service y Resolver

### 4.3 Familiares
- [ ] **FamilyMembers** (Familiares)
  - Entity con información de contacto
  - Service y Resolver

- [ ] **StudentTutors** (Tutores de Estudiantes)
  - Relación Many-to-Many entre Students y FamilyMembers
  - Tutor legal, vive con estudiante
  - Service para gestión

---

## Fase 5: Sistema Académico Core

### 5.1 Clases y Evaluaciones
- [ ] **Classes** (Clases)
  - Relación Group-Subject-Teacher-Period
  - Aula, horas semanales
  - Capacidad real
  - Service y Resolver

- [ ] **Evaluations** (Evaluaciones)
  - Entity con tipo, peso, fecha
  - Relación con Classes
  - Service y Resolver

- [ ] **Grades** (Calificaciones)
  - Relación Evaluation-Student
  - Puntuación y comentarios
  - Service con cálculos de promedios
  - Resolver con queries optimizadas

### 5.2 Asistencia
- [ ] **Attendance** (Asistencia)
  - Entity Student-Class-Date
  - Presente/Ausente con justificación
  - Service con reportes
  - Resolver

---

## Fase 6: Tutoría y Seguimiento

### 6.1 Sistema de Tutoría
- [ ] **Tutoring** (Tutorías grupales)
  - Entity Teacher-Group-Period
  - Service y Resolver

- [ ] **IndividualTutoring** (Tutorías individuales)
  - Sesiones 1:1
  - Situación presentada, apoyo brindado, resultados
  - Derivaciones
  - Service y Resolver

- [ ] **TutoringEvaluations** (Evaluaciones de tutoría)
  - Feedback de estudiantes
  - Service con análisis

### 6.2 Incidentes
- [ ] **IncidentTypes** (Tipos de incidentes)
  - Catálogo
  - Service y Resolver

- [ ] **Incidents** (Incidentes)
  - Reporte de profesor
  - Descripción, acciones, compromisos
  - Estado del incidente
  - Service y Resolver

### 6.3 Derivaciones y Seguimiento
- [ ] **Referrals** (Derivaciones)
  - Student-Teacher-Agency
  - Situación, razón, resultados
  - Service y Resolver

- [ ] **AcademicFollowUp** (Seguimiento académico)
  - Service y Resolver

---

## Fase 7: Cuestionarios y Evaluaciones

### 7.1 Sistema de Cuestionarios
- [ ] **Questionnaires** (Cuestionarios)
  - Entity con versiones
  - Service y Resolver

- [ ] **Questions** (Preguntas)
  - Tipos: Booleano, Numérico, Texto, Opciones
  - Marcador de riesgo
  - Service y Resolver

- [ ] **Answers** (Respuestas)
  - Entity polimórfica
  - Service para procesamiento

- [ ] **QuestionnaireResults** (Resultados)
  - Puntuación total y nivel de riesgo
  - Service con dashboard

### 7.2 Estilos de Aprendizaje
- [ ] **LearningStyleCategories** (Categorías)
  - Catálogo
  - Service y Resolver

- [ ] **LearningStyles** y **LearningStyleResults**
  - Test de estilos
  - Service con análisis

### 7.3 Autoevaluaciones
- [ ] **SelfEvaluations** (Autoevaluaciones)
  - Logros, factores de éxito/fracaso
  - Desempeño académico
  - Service y Resolver

---

## Fase 8: Salud y Documentos

### 8.1 Información de Salud
- [ ] **HealthGeneral** (Salud general)
  - Alergias, enfermedades crónicas
  - Tipo de sangre, servicio médico
  - Service y Resolver

- [ ] **HealthPsychological** (Salud psicológica)
  - Tratamientos
  - Service y Resolver

### 8.2 Documentos
- [ ] **StudentDocuments** (Documentos)
  - Upload de archivos
  - Tipos de documento
  - Service con storage (S3, local)
  - Resolver

---

## Fase 9: Historial y Actividades

### 9.1 Historial Académico
- [ ] **AcademicHistory** (Historial)
  - Por semestre
  - GPA, materias aprobadas/reprobadas
  - Service con reportes
  - Resolver

### 9.2 Actividades Extracurriculares
- [ ] **ExtracurricularActivities**
  - Tipo, horas, premios
  - Service y Resolver

---

## Fase 10: Comunicación

### 10.1 Sistema de Mensajería
- [ ] **Conversations** (Conversaciones)
  - Individuales y grupales
  - Service y Resolver

- [ ] **ConversationParticipants** (Participantes)
  - Service para gestión

- [ ] **Messages** (Mensajes)
  - Entity con contenido y estado
  - Service con notificaciones en tiempo real
  - Resolver con subscriptions (GraphQL)

---

## Fase 11: Configuración y Admin

### 11.1 Configuraciones
- [ ] **Configurations** (Configuraciones)
  - Key-Value store
  - Service y Resolver para admin

### 11.2 Dashboard y Reportes
- [ ] Dashboard de administrador
- [ ] Reportes generales (Excel, PDF)
- [ ] Gráficas y estadísticas

---

## Notas de Implementación

### Orden de Prioridad por Módulo:
1. **Críticos** (Fases 1-5): Sin estos, el sistema no funciona
2. **Importantes** (Fases 6-9): Funcionalidades core del sistema
3. **Mejoras** (Fases 10-11): Comunicación y administración

### Estrategia:
- Cada módulo incluye: Entity, Service, Resolver, DTOs
- Testing unitario e integración por módulo
- Migraciones de BD incrementales
- Documentación en paralelo

### Dependencias Técnicas:
- File upload: Implementar en Fase 8
- Notificaciones en tiempo real: Implementar en Fase 10
- Generación de reportes: Implementar en Fase 11

---

## Estado Actual
✅ **Fase 1 completada** (Autenticación y seguridad)  
🎯 **Siguiente**: Fase 2 - Comenzar con States, Municipalities, Addresses y Persons
