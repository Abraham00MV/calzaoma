// app/page.tsx
import Image from 'next/image'
import { ProductSlider } from '@/app/components/ProductSlider'
import { Categories } from '@/app/components/Categories'

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero / Banner */}
      <section className="relative h-[80vh] min-h-[520px] flex items-center justify-center border-b-8 border-brand-dark">
        <Image
          src="/home/Oma-banner.webp"
          alt="CalzaOma - Calzado para toda la familia"
          fill
          priority
          className="object-cover"
        />
        {/* Contenido */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-6 text-white">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            <Image
              src="/logos/Oma-logo-rise.webp"
              alt="CalzaOma Logo"
              width={130}
              height={130}
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            CalzaOma
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-white/90">
            Todo lo relacionado en calzado para damas, caballeros y niños
          </p>
          <a href="/product">
            <button className="mt-4 bg-[#c1d8f0] text-black px-10 py-3 rounded-full font-semibold shadow hover:shadow-lg hover:scale-[1.03] transition">
              Ver productos
            </button>
          </a>

        </div>
      </section>

      {/* Productos nuevos */}
      <section className="py-16" style={{ backgroundColor: '#c1d8f0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Productos nuevos</h2>
          <ProductSlider />
        </div>
      </section>

      {/* Categorías */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Categorías</h2>
          <Categories />
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="py-20" style={{ backgroundColor: '#c1d8f0' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">Sobre nosotros</h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            En CalzaOma nacimos con una idea clara: ofrecer calzado de alta calidad
            para toda la familia, combinando comodidad, diseño y precios justos.
            Desde nuestros inicios nos hemos dedicado a la comercialización y
            distribución de calzado para damas, caballeros y niños, seleccionando
            cuidadosamente cada producto para garantizar durabilidad y estilo.
            <br /><br />
            Creemos que un buen par de zapatos acompaña momentos importantes del
            día a día. Por eso trabajamos con pasión, buscando crecer junto a
            nuestros clientes y convertirnos en su tienda de confianza a largo
            plazo.
          </p>
        </div>
      </section>
    </main>
  )
}