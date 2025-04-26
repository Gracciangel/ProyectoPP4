# Backend

---

## Índice

- [Tecnología](#tecnología)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Rutas](#Rutas)


---

## Introducción

### Estructura del Proyecto


/backend
  ├── /src
  │    ├── /Controllers
  │    ├── /Models
  │    ├── /Routes
  │    └── /Database
  ├── .env
  ├── package.json
  ├── tsconfig.json
  └── README.md

Este proyecto de Backend utiliza **Express** como framework de Node.js para gestionar las conexiones entre el frontend y la base de datos.

### Dependencias principales:
- **Express** v5.1.0  
  Framework de Node.js para crear el servidor y manejar rutas.
  
- **Cors** v2.8.5  
  Middleware para habilitar el acceso cruzado entre dominios (CORS).
  
- **SQLite3** v5.1.1  
  Motor de base de datos ligero que se utiliza en este proyecto para almacenar la información.

- **dotenv** v16.5.0  
  Para el uso de variables de entorno, permitiendo la configuración flexible y segura del proyecto.

- **nodemon** v3.1.10
  Para detectar cambios en tiempo real sin necesidad de inicializar el servidor nuevamente.
---

## Instalación


1. Clona el repositorio:
2. npm install (para instalar todas las dependencias)
3. npm run dev (para inicializar el servidor)

```bash
git clone https://github.com/Gracciangel/ProyectoPP4

