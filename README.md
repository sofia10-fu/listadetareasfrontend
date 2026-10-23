# Mis tareas

Aplicación sencilla para organizar tareas. Este frontend usa React, TypeScript y Vite, y se conecta a la API de [listadetareas](https://github.com/sofia10-fu/listadetareas).

## Requisitos

- Node.js y npm.
- MongoDB ejecutándose en local, como espera la configuración actual de la API.
- El backend `listadetareas` iniciado en `http://localhost:3000`.

## Iniciar el proyecto

Primero, inicia la API desde su carpeta:

```bash
cd listadetareas
npm install
npm run dev
```

Después, desde esta carpeta del frontend:

```bash
npm install
npm run dev
```

Abre la dirección que muestre Vite (normalmente `http://localhost:5173`). Vite redirige las solicitudes `/api` al backend local en el puerto `3000`.

## Comandos

| Comando | Para qué sirve |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Comprueba TypeScript y genera `dist/` |
| `npm run preview` | Previsualiza la versión compilada |
| `npm run lint` | Revisa el código con Oxlint |

## Estructura

```text
src/
├── components/
│   ├── BarraNavegacion/
│   ├── ListaTareas/
│   ├── ModalTarea/
│   └── TarjetaTarea/
├── pages/
│   ├── PaginaInicio/
│   └── PaginaTareas/
├── services/       # Solicitudes Axios a la API
├── types/          # Tipo Tarea según el backend
├── App.tsx          # Rutas de la aplicación
└── main.tsx         # Punto de entrada de React
```
