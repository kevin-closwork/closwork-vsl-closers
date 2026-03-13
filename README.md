# Closwork — Programa de Certificación en High Ticket Closing

Landing VSL para el programa de certificación en High Ticket Closing con Andrés Guauque. Conecta personas que quieren ganar en dólares como closers con la red de empresas de Closwork.

## Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Manrope (Google Fonts)

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Build

```bash
npm run build
```

Los archivos se generan en `dist/`.

## Estructura

- `src/App.jsx` — Landing principal con 15 secciones
- `src/ThankYouPage.jsx` — Página de agradecimiento post-agenda
- `src/index.css` — Variables CSS y estilos globales

## Página de agradecimiento

Configura tu herramienta de scheduling (Calendly, etc.) para redirigir a `?thankyou=1` o `#gracias` después de que el prospecto agenda. Ejemplo: `https://tudominio.com/?thankyou=1`

## CTA

Todos los botones dirigen a `#agenda`. Reemplaza el `href` del CTAButton por el enlace de tu calendario cuando integres.
