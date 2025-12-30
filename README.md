## LUGAV · Portafolio Audiovisual

Sitio web Bootstrap en español para el portafolio de LUGAV. Utiliza un sistema de componentes HTML (`components/`) cargados mediante `js/components-loader.js`, galerías filtrables e iframes de YouTube para mostrar videos recientes.

### Requisitos básicos

- Navegador moderno con soporte para Fetch API.
- Servir el proyecto a través de HTTP/HTTPS (no abrir los HTML con `file://`).

### ¿Por qué necesito un servidor local?

1. **Componentes reutilizables**: `components-loader.js` usa `fetch()` para inyectar `header`, `footer` y `preloader`. Los navegadores bloquean esas solicitudes cuando la página se abre directamente desde el sistema de archivos, por lo que los componentes no aparecerán.
2. **Videos de YouTube**: algunos videos requieren que YouTube reciba el encabezado `Referer` o el parámetro `origin`. Si cargas la página con `file://`, ese dato no existe y el iframe responde con el error **153 – PLAYABILITY_ERROR_CODE_EMBEDDER_IDENTITY_MISSING_REFERRER** (“El video no está disponible”). Servir la web con HTTP soluciona el problema.

### Cómo ejecutar el proyecto localmente

En la raíz del proyecto ejecuta uno de los siguientes comandos:

```bash
# Python 3
python -m http.server 8000

# o Node.js
npx http-server
```

Luego visita `http://localhost:8000/portfolio.html` (o la página que necesites) para obtener la experiencia completa.

### Estructura rápida

- `components/`: encabezado, pie y preloader reutilizables.
- `img/350` y `img/1280`: versiones en baja y alta resolución para la galería.
- `js/video-control.js`: controla la expansión de videos y ahora añade el parámetro `origin` a los iframes cuando es posible.

### Problemas conocidos

- Si aún ves “El video no está disponible”, verifica que el servidor se ejecute bajo `http://` u `https://` y que no haya extensiones bloqueando el encabezado `Referer`.
- Recuerda limpiar caché después de actualizar imágenes o componentes.

### Producción

Sube el contenido a cualquier hosting estático (Netlify, Vercel, GitHub Pages, etc.) para garantizar que YouTube reconozca el dominio y que los componentes se carguen correctamente.


