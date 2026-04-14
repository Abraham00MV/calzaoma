// app/page.tsx
import Image from 'next/image'
import { ProductSlider } from '@/app/components/ProductSlider'
import { Categories } from '@/app/components/Categories'

export default function Home() {
  return (
    <main className="flex flex-col">

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] flex items-center justify-center border-b-8 border-brand-dark">
        <Image
          src="/home/Oma-banner.webp"
          alt="CalzaOma - Calzado para toda la familia"
          fill
          priority
          className="object-cover"
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-6 text-white">

          {/* Logo */}
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            <Image
              src="/logos/Oma-logo-rise.webp"
              alt="CalzaOma Logo"
              width={130}
              height={130}
              className="object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            CalzaOma
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl max-w-2xl text-white/90 font-medium">
            Todo lo relacionado en calzado para damas, caballeros y niños
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">

            <a href="/product">
              <button className="bg-[#c1d8f0] text-black px-10 py-3 rounded-full font-medium tracking-tight shadow hover:shadow-lg hover:scale-[1.03] transition">
                Ver productos
              </button>
            </a>

            <a href="/suggestor">
              <button className="bg-black text-white px-10 py-3 rounded-full font-medium tracking-tight shadow hover:shadow-lg hover:scale-[1.03] transition">
                Encontrar mi calzado ideal
              </button>
            </a>

          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="py-16" style={{ backgroundColor: '#c1d8f0' }}>
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10 text-black">
            Productos nuevos
          </h2>

          <ProductSlider />
        </div>
      </section>

      {/* Categorías */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-10 text-black">
            Categorías
          </h2>

          <Categories />
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="relative py-24 bg-[#c1d8f0] overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT: IMAGE FLOATING WINDOW */}
          <div className="relative">

            {/* BACK LAYER (DEPTH) */}
            <div className="absolute -inset-6 bg-white/30 rounded-3xl blur-2xl z-0" />

            {/* MAIN IMAGE CARD */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/40">

              <div className="relative h-[420px] md:h-[500px] w-full">

                <Image
                  src="/home/about-oma.webp"
                  alt="Sobre CalzaOma"
                  fill
                  className="object-cover object-center scale-110 hover:scale-115 transition-transform duration-700"
                  priority
                />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />

              </div>

            </div>

            <div className="absolute -bottom-6 -right-6 bg-white shadow-xl px-5 py-3 rounded-2xl z-20">
              <p className="text-sm font-semibold text-black">
                +2 años de experiencia
              </p>
            </div>

          </div>

          {/* RIGHT: TEXT */}
          <div className="relative">

            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-10 shadow-xl">

              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                Sobre nosotros
              </h2>

              <p className="text-slate-700 leading-relaxed text-lg">
                En CalzaOma nacimos con una idea clara: ofrecer calzado de alta calidad
                para toda la familia, combinando comodidad, diseño y precios justos.
                Desde nuestros inicios nos hemos dedicado a la comercialización y
                distribución de calzado para damas, caballeros y niños, seleccionando
                cuidadosamente cada producto para garantizar durabilidad y estilo.
                <br /><br />
                Creemos que un buen par de zapatos acompaña momentos importantes del día a día.
                Por eso trabajamos con pasión, buscando crecer junto a nuestros clientes y
                convertirnos en su tienda de confianza a largo plazo.
              </p>

              {/* mini stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">

                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">+500</p>
                  <p className="text-xs text-slate-600">Clientes</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">+200</p>
                  <p className="text-xs text-slate-600">Modelos</p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">24/7</p>
                  <p className="text-xs text-slate-600">Soporte</p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}