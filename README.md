# Documentación de Solución

## Tabla de contenido

- [Propósito del Proyecto](#propósito-del-proyecto)
- [Premisas de Diseño](#premisas-de-diseño)
- [Solución](#solución)
  - [Pipelines CI/CD](#pipelines-cicd)
- [Infraestructura](#infraestructura)
- [Observabilidad](#observabilidad)

---

## Propósito del Proyecto

El presente documento tiene como propósito definir la solución propuesta para la implementación de un pipeline CI/CD automatizado utilizando GitHub Actions.

La solución abarca la integración de herramientas clave como:

- **SonarQube** para el análisis de calidad de código.
- **GitGuardian** para la detección de secretos en el código.
- **Checkov** para el cumplimiento de estándares en manifiestos de infraestructura como código (IaC).
- Compilación de aplicaciones **Node.js** y **React**.
- Creación de imágenes Docker para garantizar una entrega continua y eficiente.

El objetivo de la solución es mejorar la eficiencia en los procesos de desarrollo, asegurando calidad, seguridad y cumplimiento de estándares, mientras se reduce el tiempo de entrega de nuevas funcionalidades y correcciones.

---

## Premisas de Diseño

### Despliegue

Se eligieron servicios como **ECS**, **S3**, **Aurora Serverless**, **Secrets Manager** y **CloudFront** para demostrar un enfoque realista, escalable y alineado con buenas prácticas de arquitectura cloud-native, sin requerir infraestructura compleja.

### Observabilidad y CI/CD

La solución prioriza la implementación de mecanismos robustos de observabilidad (métricas, logs, trazas) y un pipeline CI/CD automatizado, con posibilidad de rollback y despliegue controlado, enfocado en garantizar la estabilidad operativa.

---

## Solución

### Pipelines CI/CD

Con el fin de tener un proceso escalable y mantenible, se propone desarrollar un **custom action** diseñado para ejecutar herramientas de análisis de código estático, detección de secretos, análisis de IaC, compilación y pruebas unitarias, y construcción de imágenes Docker.

#### 1. Herramientas de Calidad y Seguridad

- **SonarQube**: Analiza calidad y vulnerabilidades del código fuente.
- **GitGuardian**: Detecta secretos o credenciales comprometidas.
- **Checkov**: Valida manifiestos de infraestructura como código.

#### 2. Inputs para Backend y Frontend

- **Backend (Express)**:
  - Rutas configurables para cada proyecto.
  - Ejecución de scripts definidos en `package.json`.
  - Pruebas unitarias automatizadas.

- **Frontend (React)**:
  - Rutas configurables.
  - Compilación con Node.js.
  - Ejecución de pruebas unitarias.

#### 3. Flujo y Ejecución

El flujo permite ejecución en **paralelo** o **en serie**, según la necesidad. Se prioriza la ejecución completa del pipeline incluso si hay errores en seguridad (se recomienda revisión manual posterior).

---

## Infraestructura

La arquitectura de despliegue utiliza exclusivamente servicios administrados de **AWS**:

- **Backend**: Amazon ECS con **Fargate** (serverless containers).
- **Frontend**: Amazon **S3** + **CloudFront** (CDN).
- **Dominios**: Amazon **Route 53**.
- **Certificados**: **ACM** (SSL/TLS).
- **Base de datos**: Amazon **Aurora PostgreSQL Serverless**.
- **Secrets**: **AWS Secrets Manager**.
- **Infraestructura como código**: **AWS CDK**.

Este enfoque permite control de versiones, reproducibilidad y automatización total del entorno.

---

## Observabilidad

Para una visibilidad completa del sistema, se implementan dashboards de monitoreo con métricas clave:

- **Backend (ECS)**:
  - Latencia por endpoint.
  - Total de requests por endpoint.
  - Distribución de códigos HTTP.
  - Requests por segundo (RPS).
  - Métricas de CPU y memoria con **cAdvisor**.

- **Logs (Loki)**:
  - Últimos errores.
  - Frecuencia de logs de nivel `error`.
  - Búsqueda de patrones (ej. “DB timeout”).

---

