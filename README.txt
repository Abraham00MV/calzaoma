CalzaOma — Tienda Inteligente de Calzado

Descripción general
-------------------
CalzaOma es una aplicación web orientada a la exploración y recomendación de calzado. Su funcionamiento combina una interfaz moderna con un sistema de recomendación basado en parámetros ingresados por el usuario.

La aplicación permite visualizar productos, consultar su detalle, agregarlos a un carrito y recibir sugerencias personalizadas según criterios específicos.

---

Lógica principal del sistema
---------------------------

El núcleo funcional se basa en dos partes:

1. Gestión de productos
2. Motor de recomendaciones

Los productos están definidos mediante una estructura tipada que incluye información comercial y atributos utilizados para evaluación:

- Identificación (id, slug)
- Información visual y descriptiva (nombre, imagen, categoría)
- Precio
- Parámetros funcionales:
  - useType (tipo de uso: trabajo o deporte)
  - comfortScore (nivel de comodidad)
  - minSize / maxSize (rango de tallas soportadas)

---

Motor de recomendaciones
-----------------------

El sistema de recomendaciones toma tres entradas del usuario:

- Medida del pie (foot)
- Tipo de uso (use)
- Nivel de comodidad (comfort)

Con estos valores, el motor ejecuta una evaluación sobre todos los productos disponibles.

El proceso consiste en:

1. Validar si la talla del usuario está dentro del rango del producto
2. Comparar el tipo de uso solicitado con el del producto
3. Evaluar el nivel de comodidad del producto

A cada producto se le asigna un puntaje (score) en función de estos criterios.

Posteriormente:

- Los productos se ordenan por score descendente
- Se devuelven los mejores resultados
- Se clasifican visualmente como:
  - "Perfect Match"
  - "Buen Match"

---

Gestión del carrito
------------------

El carrito se implementa utilizando Zustand, una librería de manejo de estado global.

Documentación oficial:
https://zustand-demo.pmnd.rs/

Zustand permite:

- Compartir el estado del carrito entre componentes
- Agregar productos desde cualquier vista
- Mantener consistencia sin necesidad de prop drilling

El flujo es el siguiente:

1. El usuario selecciona un producto
2. Define talla y cantidad
3. Se ejecuta la acción addToCart
4. Se almacena un objeto con la siguiente estructura:

{
  id,
  name,
  price,
  image,
  size,
  quantity
}

Este estado queda disponible globalmente en la aplicación.

---

Tipado de datos
---------------

El uso de TypeScript permite definir estructuras estrictas para los datos.

Ejemplo de tipo principal:

type Product = {
  id: number
  slug: string
  name: string
  price: number
  image: string
  category: string
  useType: 'trabajo' | 'deporte'
  comfortScore: number
  minSize: number
  maxSize: number
}

Esto garantiza:

- Consistencia en el manejo de datos
- Validación en tiempo de desarrollo
- Integración directa con el motor de recomendaciones

---

Estructura funcional
-------------------

Home:
- Banner principal
- Acceso a productos
- Acceso al recomendador
- Slider de productos

Listado de productos:
- Visualización en grid
- Navegación hacia detalle

Detalle de producto (PDP):
- Visualización de imágenes
- Selección de talla
- Selección de cantidad
- Acción de agregar al carrito

Motor de recomendaciones:
- Formulario de entrada
- Validación de datos
- Redirección con parámetros

Resultados:
- Lista de productos recomendados
- Indicador de compatibilidad
- Acceso directo al PDP

---

Interfaz y comportamiento
------------------------

La interfaz está construida con un enfoque modular basado en componentes.

Se emplean:

- Layouts divididos
- Interacciones por hover
- Transiciones suaves
- Cards con jerarquía visual

Las imágenes se gestionan mediante el componente optimizado de Next.js.

---

Tecnologías utilizadas
---------------------

- Next.js
- React
- TypeScript
- Zustand
- Tailwind CSS
- next/image

---

Consideraciones
--------------

- Los datos actuales son simulados (mock data)
- El sistema está preparado para integrarse con una API real
- El motor de recomendaciones es extensible

---
