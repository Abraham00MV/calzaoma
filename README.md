This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# 🛍️ CalzaOma — Tienda Inteligente de Calzado

## 📌 Descripción general

CalzaOma es una aplicación web orientada a la exploración y recomendación de calzado. Su funcionamiento combina una interfaz moderna con un sistema de recomendación basado en parámetros ingresados por el usuario.

La aplicación permite visualizar productos, consultar su detalle, agregarlos a un carrito y recibir sugerencias personalizadas según criterios específicos.

---

## 🧠 Lógica principal del sistema

El núcleo funcional se basa en dos partes:

1. Gestión de productos  
2. Motor de recomendaciones  

Los productos están definidos mediante una estructura tipada que incluye información comercial y atributos utilizados para evaluación:

- Identificación (`id`, `slug`)
- Información visual y descriptiva (`name`, `image`, `category`)
- Precio
- Parámetros funcionales:
  - `useType` (tipo de uso: trabajo o deporte)
  - `comfortScore` (nivel de comodidad)
  - `minSize` / `maxSize` (rango de tallas soportadas)

---

## 🔍 Motor de recomendaciones

El sistema de recomendaciones toma tres entradas del usuario:

- Medida del pie (`foot`)
- Tipo de uso (`use`)
- Nivel de comodidad (`comfort`)

### Proceso

1. Validar si la talla del usuario está dentro del rango del producto  
2. Comparar el tipo de uso solicitado con el del producto  
3. Evaluar el nivel de comodidad del producto  

A cada producto se le asigna un puntaje (**score**) en función de estos criterios.

### Resultado

- Los productos se ordenan por score descendente  
- Se devuelven los mejores resultados  
- Se clasifican visualmente como:

  - ✅ **Perfect Match**
  - ⚖️ **Buen Match**

---

## 🛒 Gestión del carrito

El carrito se implementa utilizando **Zustand**, una librería de manejo de estado global.

📚 Documentación oficial:  
https://zustand-demo.pmnd.rs/

### Capacidades

- Compartir el estado del carrito entre componentes  
- Agregar productos desde cualquier vista  
- Mantener consistencia sin necesidad de prop drilling  

### Flujo

1. El usuario selecciona un producto  
2. Define talla y cantidad  
3. Se ejecuta la acción `addToCart`  
4. Se almacena un objeto con la siguiente estructura:

```ts
{
  id,
  name,
  price,
  image,
  size,
  quantity
}


