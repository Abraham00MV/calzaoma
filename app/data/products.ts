export type Product = {
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

export const products: Product[] = [
  {
    id: 1,
    slug: 'new-balance-530',
    name: 'New Balance 530',
    price: 120000,
    image: '/shoes/balance-530.png',
    category: 'Tenis deportivos',
    useType: 'deporte',
    comfortScore: 9,
    minSize: 24,
    maxSize: 30,
  },
  {
    id: 2,
    slug: 'nike-zoom',
    name: 'Nike Zoom',
    price: 150000,
    image: '/shoes/nike-zoom.png',
    category: 'Tenis running',
    useType: 'deporte',
    comfortScore: 8,
    minSize: 25,
    maxSize: 31,
  },
  {
    id: 3,
    slug: 'puma-faster',
    name: 'Puma Faster',
    price: 110000,
    image: '/shoes/puma-faster.png',
    category: 'Sandalias deportivas',
    useType: 'trabajo',
    comfortScore: 6,
    minSize: 22,
    maxSize: 28,
  },
  {
    id: 4,
    slug: 'puma-omnia',
    name: 'Puma Omnia',
    price: 130000,
    image: '/shoes/puma-omnia.png',
    category: 'Tenis urbanos',
    useType: 'trabajo',
    comfortScore: 7,
    minSize: 23,
    maxSize: 29,
  },
]
