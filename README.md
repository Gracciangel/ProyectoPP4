# Proyecto PP4

## Biblioteca Online

Este repositorio contiene la **Biblioteca Online** de tu proyecto PP4, con dos partes principales:

* **Frontend**: Interfaz de usuario desarrollada en React.
* **Backend**: Servidor y API construidos con Node.js.

---

### 📁 Estructura del Proyecto

```
Proyecto-PP4/
├── Frontend/
│   ├── FrontPP4/        # Código fuente de la aplicación React
│   └── ...
├── Backend/             # Código fuente del servidor Node.js
│   └── ...
└── README.md            # Este archivo
```

---

### 🔗 Accesos rápidos

* [Frontend](./Frontend/README.md)
* [Backend](./Backend/README.md)

---

## 🚀 Comenzando

En este proyecto usamos **concurrently** para levantar tanto el frontend como el backend con un solo comando. A continuación se detallan los pasos para poner todo en marcha.

### Prerrequisitos

* Node.js v14+ y npm instalados.
* (Opcional) Git para clonar el repositorio.

### 1. Clonar el repositorio

```bash
git clone https://tu-repositorio-url.git
cd Proyecto-PP4
```

### 2. Instalar dependencias

Cada parte del proyecto tiene sus propias dependencias. Puedes instalarlas de manera independiente o en paralelo:

1. **Instalación individual**:

   ```bash
   cd Backend && npm install
   cd ../Frontend/FrontPP4 && npm install
   ```

2. **Instalación con un solo comando** (recomendado):

   ```bash
   npm install --prefix Backend && npm install --prefix Frontend/FrontPP4
   ```

---

## ⚙️ Scripts disponibles

En el `package.json` de la raíz del proyecto hemos definido los siguientes scripts:

```json
"scripts": {
  "start-back": "cd Backend && npm run dev",
  "start-front": "cd Frontend/FrontPP4 && npm run dev",
  "start": "concurrently \"npm run start-back\" \"npm run start-front\""
}
```

* `start-back`: Arranca el servidor backend en modo desarrollo.
* `start-front`: Inicia la aplicación React en modo desarrollo.
* `start`: Levanta **simultáneamente** backend y frontend usando **concurrently**.

### Uso de `concurrently`

[`concurrently`](https://www.npmjs.com/package/concurrently) es una utilidad que permite ejecutar múltiples comandos npm en paralelo, mostrando sus logs en la misma terminal con colores diferenciados.

1. **Instalar `concurrently`** (si aún no está instalado como dependencia de desarrollo):

   ```bash
   npm install --save-dev concurrently
   ```

2. **Ejecutar ambos servidores** con un solo comando:

   ```bash
   npm run start
   ```

   * El backend quedará expuesto (por defecto) en `http://localhost:3000` (o el puerto que configures).
   * El frontend quedará disponible en `http://localhost:5173` (o el puerto configurado).

Al usar `npm run start`, `concurrently` lanzará automáticamente:

* `npm run start-back`
* `npm run start-front`

Y podrás ver ambos procesos corriendo en paralelo.

---

## 📖 Más información

* Para detalles de configuración del **Frontend**, consulta `Frontend/README.md`.
* Para detalles de configuración del **Backend**, consulta `Backend/README.md`.

---
