# Café Altamira · Interfaz web responsiva

Sitio web responsivo para **Café Altamira**, un café de especialidad colombiano. Presenta la historia del negocio, su menú de bebidas y panadería, las experiencias que ofrece, preguntas frecuentes y un formulario de reservas.

**Autor:** German Andres Tirado Ariza
**Programa:** Ingeniería de Software

## Cómo ver el proyecto

No requiere instalación. Basta con abrir el archivo `index.html` en cualquier navegador moderno (Chrome, Edge, Firefox o Safari).

## Estructura del repositorio

```
cafe-altamira/
├── index.html            Estructura principal de la página (HTML5 semántico)
├── css/
│   ├── estilos.css       Estilos base (enfoque mobile-first)
│   └── responsive.css    Media Queries para tableta y computador
├── js/
│   └── main.js           Menú adaptable, filtros, tarjetas y validación del formulario
├── img/                  Ilustraciones e íconos en formato SVG
├── fonts/                Tipografías Lora y Poppins (.woff2)
└── docs/
    └── documentacion.pdf     Documentación del desarrollo
```

## Video de validación

https://youtu.be/Ms65H5F-3Ms

## Tecnologías

- **HTML5:** `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `details`, `form`, `footer`.
- **CSS3:** variables, Flexbox, CSS Grid, Media Queries, `clamp()`, transiciones y animaciones.
- **JavaScript:** sin librerías externas.

## Diseño responsivo

| Punto de quiebre | Dispositivo | Distribución |
|---|---|---|
| Base | Teléfono | Una columna, menú lateral |
| `min-width: 480px` | Teléfono grande | Formulario en dos columnas |
| `min-width: 768px` | Tableta | Productos en dos columnas |
| `min-width: 1024px` | Computador | Menú horizontal, productos en tres columnas |

## Elementos interactivos

- Menú de navegación adaptable (hamburguesa) en tableta y móvil.
- Filtro de productos por categoría.
- Tarjetas con detalles desplegables y botón para agregar al pedido.
- Preguntas frecuentes desplegables.
- Formulario de reservas con validación y mensaje de confirmación.
- Botón para volver al inicio de la página.
